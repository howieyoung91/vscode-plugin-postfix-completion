import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "javascript", label: "err" },
  { language: "typescript", label: "err" }
)
class ErrorPostfixHandler extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): LineTextHandleResult | null {
    let startIndex = firstNonWhiteSpaceIndex;
    let endIndex = lineText.lastIndexOf(".");
    let replacement = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(`console.error(${replacement});`),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
