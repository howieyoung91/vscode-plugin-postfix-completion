import { removeAllListeners } from "node:process";
import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "java", label: "while" },
  { language: "c", label: "while" },
  { language: "cpp", label: "while" },
  { language: "javascript", label: "while" },
  { language: "typescript", label: "while" }
)
class WhilePostfixHandler extends BasePostfixHandler {
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
    return {
      text: new SnippetString(`while (${replacement}) {\n${indent()}$1\n}`),
      deleteText: {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
