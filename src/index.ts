/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {add_text_block} from './blocks/text';
import {dartGenerator} from 'blockly/dart';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';
import './toolbox_style.css';
import './generators/dart';
import { addTextGen } from './generators/dart';
import {stringLengthGen, moveProject} from './generators/dart_generator';
import {createBlockByJS} from './blocks/blocks_by_js';
import * as LexicalVariables from '@mit-app-inventor/blockly-block-lexical-variables';

let options = { 
	toolbox : toolbox, 
	collapse : true, 
	comments : false, 
	disable : false, 
	maxBlocks : Infinity, 
	trashcan : true, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	rtl : false, 
	scrollbars : true, 
	sounds : false, 
	oneBasedIndex : false, 
  renderer: 'thrasos',
	zoom : {
		controls : true, 
		wheel : true, 
		startScale : 1, 
		maxScale : 3, 
		minScale : 0.3, 
		scaleSpeed : 1.2
	}
};
// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode');
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = blocklyDiv && Blockly.inject(blocklyDiv, options);

Blockly.common.defineBlocks(add_text_block);
createBlockByJS();
LexicalVariables.init(ws);
dartGenerator['add_text'] = addTextGen;
dartGenerator['string_length'] = stringLengthGen;
dartGenerator['move_project'] = moveProject;
// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const showCode = () => {
  const code = dartGenerator.workspaceToCode(ws);
  if (codeDiv) {
    codeDiv.textContent = code;
  }
  if (outputDiv) outputDiv.innerHTML = '';
};

if (ws) {
    // Load the initial state from storage and run the code.
  load(ws);
  showCode();
  // single block code generation.
  // orphans disabled
  //ws.addChangeListener(Blockly.Events.disableOrphans);
  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()) {
      return;
    }
    showCode();
  });
}
