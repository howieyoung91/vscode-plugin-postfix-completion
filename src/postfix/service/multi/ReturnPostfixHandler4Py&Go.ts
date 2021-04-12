import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import {PostfixHandler} from "../../base/decorator/PostfixHandler";

@PostfixHandler(
  {language: "python", label: "return"},
  {language: "go", label: "return"}
)
class ReturnPostfixHandler extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhitespaceCharacterIndex: number
  ): LinetextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(
      firstNonWhitespaceCharacterIndex,
      endIndex
    );
    return {
      text: new SnippetString(`return ${replacement}`),
      detail: "postfix",
      documentation: `return ${replacement}`,
      deleteText: {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
