import {dartGenerator} from 'blockly/dart';
import * as Blockly from 'blockly/core';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!

 export function addTextGen(block: Blockly.Block) {

  const text = dartGenerator.valueToCode(block, 'TEXT',
  dartGenerator.ORDER_NONE) || '\'\'';
  const color = dartGenerator.valueToCode(block, 'COLOR',
  dartGenerator.ORDER_ATOMIC) || '\'#ffffff\'';

  const addText = dartGenerator.provideFunction_(
      'addText',
      ['function ' + dartGenerator.FUNCTION_NAME_PLACEHOLDER_ +
          '(text, color) {\n',
      '  // Add text to the output area.\n',
      '  const outputDiv = document.getElementById(\'output\');\n',
      '  const textEl = document.createElement(\'p\');\n',
      '  textEl.innerText = text;\n',
      '  textEl.style.color = color;\n',
      '  outputDiv.appendChild(textEl);\n',
      '}']);
    // Generate the function call for this block.
  const code = `${addText}(${text}, ${color});\n`;
  return code;
};