import * as Blockly from 'blockly/core';
import {dartGenerator} from 'blockly/dart';
// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!

 export function stringLengthGen(block: Blockly.Block) {
  const code = 'int string_length(string VALUE) {\n'
    '  return VALUE.length;\n'
    '}\n';
  return [code, dartGenerator.ORDER_NONE ];
};

export function moveProject(block: Blockly.Block) {
  const code = 'bool moveProject() {\n'
    '  return true;\n'
    '}\n';
  return [code, dartGenerator.ORDER_NONE ];
};