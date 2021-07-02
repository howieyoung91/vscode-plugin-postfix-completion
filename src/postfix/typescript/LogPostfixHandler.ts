import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "javascript", label: "log" },
  { language: "typescript", label: "log" },
  { language: "vue", label: "log" },
  { language: "html", label: "log" }
)
class LogPostfixHandler extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): LineTextHandleResult | null {
    let startIndex = firstNonWhiteSpaceIndex;
    let endIndex = lineText.lastIndexOf(".");
    let replacement = lineText.substring(startIndex, endIndex).trimEnd();
    return {
      text: new SnippetString(`console.log(${replacement});`),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
