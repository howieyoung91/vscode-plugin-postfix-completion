import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import DocumentUtil from "../../../util/DocumentUtil";

@PostfixHandler({ language: "python", label: "while" })
class WhilePostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): LinetextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(firstNonWhiteSpaceIndex, endIndex);
    return {
      text: new SnippetString(
        `while ${replacement}:\n${DocumentUtil.indentCharacters()}`
      ),
      detail: "postfix",
      documentation: `while ${replacement}:\n`,
      deleteText: {
        startIndex: firstNonWhiteSpaceIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
