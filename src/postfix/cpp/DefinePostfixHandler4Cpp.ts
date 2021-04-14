import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {PostfixHandler} from "../../base/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  {language: "cpp", label: "define"},
  {language: "c`", label: "define"}
)
class DefinePostfixHandler4Cpp extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    const newText = `#define ${replacement}`;
    return {
      text: new SnippetString(newText),
      detail: `postfix`,
      documentation: newText,
      deleteText: {
        startIndex: startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
