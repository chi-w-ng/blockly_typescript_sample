import * as Blockly from 'blockly/core';

export function createBlockByJS(){
    Blockly.Blocks['string_length'] = {
        init: function() {
          this.appendValueInput('VALUE')
              .setCheck('String')
              .appendField('length of');
          this.setOutput(true, 'Number');
          this.setColour(160);
          this.setTooltip('Returns number of letters in the provided text.');
          this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
        }
    };

    Blockly.Blocks['move_project'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("move project");
        this.appendDummyInput()
            .appendField("project id:")
            .appendField(new Blockly.FieldTextInput("project id"), "PROJECTID");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("move project by id");
        this.setHelpUrl("");
      }
    };
}


  