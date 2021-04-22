import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "python", label: "not" })
class NotPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string
  ): string | SnippetString | LinetextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(`not ${replacement}`),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
