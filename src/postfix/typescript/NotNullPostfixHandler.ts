import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "notnull" },
  { language: "typescript", label: "notnull" },
  { language: "vue", label: "notnull" },
  { language: "html", label: "notnull" }
)
class NotNullPostfixHandler4TsJs extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhitespaceCharacterIndex: number
  ): LineTextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(
      firstNonWhitespaceCharacterIndex,
      endIndex
    );
    const newText = `if (${replacement} !== null) {\n${indent()}$1\n}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
