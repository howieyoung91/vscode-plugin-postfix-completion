import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { SnippetString } from "vscode";

@PostfixHandler({ language: "python", label: "print" })
class PrintPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex
  ): string | SnippetString | LinetextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(firstNonWhiteSpaceIndex, endIndex);
    return {
      text: new SnippetString(`print (${replacement})`),
      detail: "postfix",
      documentation: `print (${replacement})`,
      deleteText: {
        startIndex: firstNonWhiteSpaceIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
