import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "java", label: "if" },
  { language: "c", label: "if" },
  { language: "cpp", label: "if" },
  { language: "javascript", label: "if" },
  { language: "typescript", label: "if" },
  { language: "vue", label: "if" },
  { language: "html", label: "if" }
)
class IfPostfixHandler extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhitespaceCharacterIndex: number
  ): LineTextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText
      .substring(firstNonWhitespaceCharacterIndex, endIndex)
      .trimEnd();
    if (replacement.length === 0) {
      return null;
    }
    const newText = `if (${replacement}) {\n${indent()}$1\n}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
