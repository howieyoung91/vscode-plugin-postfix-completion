import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
  { language: "java", label: "return" },
  { language: "c", label: "return" },
  { language: "cpp", label: "return" },
  { language: "javascript", label: "return" },
  { language: "typescript", label: "return" }
)
class ReturnPostfixHandler extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhitespaceCharacterIndex: number
  ): LineTextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    let replacement = lineText.substring(
      firstNonWhitespaceCharacterIndex,
      endIndex
    );
    return {
      text: new SnippetString(`return ${replacement};`),
      detail: `postfix`,
      documentation: `return ${replacement};`,
      deleteText: {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
