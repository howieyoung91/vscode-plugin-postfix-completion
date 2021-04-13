import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import DocumentUtil from "../../util/DocumentUtil";


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
    const replacement = lineText.substring(
      firstNonWhitespaceCharacterIndex,
      endIndex
    );
    return {
      text: new SnippetString(
        `while (${replacement}) {\n${DocumentUtil.indentCharacters()}$1\n}`
      ),
      detail: `postfix`,
      documentation: `while (${replacement}) {\n\n}`,
      deleteText: {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
