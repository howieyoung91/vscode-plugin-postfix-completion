import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import DocumentUtil from "../../../util/DocumentUtil";

@PostfixHandler({ language: "c", label: "notnull" })
class NotnullPostfixHandler4Cpp extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstWhiteSpaceIndex: number
  ): LineTextHandleResult {
    let startIndex = firstWhiteSpaceIndex;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    const newText = `if (${replacement} != NULL){\n${DocumentUtil.getIndentCharacters()}$1\n}`;
    return {
      text: new SnippetString(newText),
      detail: `postfix`,
      documentation: newText,
      deleteText: {
        startIndex: startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
