import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler({ language: "python", label: "var" })
class VarPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): string | SnippetString | LinetextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(firstNonWhiteSpaceIndex, endIndex);
    const newText = `\${1:varName} = ${replacement}`;
    return {
      text: new SnippetString(newText),
      detail: "postfix",
      documentation: newText,
      deleteText: {
        startIndex: firstNonWhiteSpaceIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
