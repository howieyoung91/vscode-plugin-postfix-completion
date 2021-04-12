import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "java", label: "sout" })
class SoutPostfixHandler4J extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhitespaceCharacterIndex: number
  ): LineTextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(
      firstNonWhitespaceCharacterIndex,
      endIndex
    );
    const newText = `System.out.println(${replacement});`;
    return {
      text: new SnippetString(newText),
      detail: `postfix`,
      documentation: newText,
      deleteText: {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
