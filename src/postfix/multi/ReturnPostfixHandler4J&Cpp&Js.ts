import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "java", label: "return" },
  { language: "c", label: "return" },
  { language: "cpp", label: "return" },
  { language: "javascript", label: "return" },
  { language: "typescript", label: "return" },
  { language: "vue", label: "return" },
  { language: "html", label: "return" }
)
class ReturnPostfixHandler extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhitespaceCharacterIndex: number
  ): LineTextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    let replacement = lineText
      .substring(firstNonWhitespaceCharacterIndex, endIndex)
      .trimEnd();
    return {
      text: new SnippetString(`return ${replacement};`),
      deleteText: {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
