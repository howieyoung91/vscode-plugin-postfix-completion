import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";

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
      deleteText: {
        startIndex: firstNonWhiteSpaceIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
