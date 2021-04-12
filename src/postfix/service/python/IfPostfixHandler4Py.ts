import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import DocumentUtil from "../../../util/DocumentUtil";

@PostfixHandler({ language: "python", label: "if" })
class IfPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): string | SnippetString | LinetextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(firstNonWhiteSpaceIndex, endIndex);
    return {
      text: new SnippetString(
        `if ${replacement}:\n${DocumentUtil.indentCharacters()}`
      ),
      detail: "postfix",
      documentation: `if ${replacement}:\n`,
      deleteText: {
        startIndex: firstNonWhiteSpaceIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
