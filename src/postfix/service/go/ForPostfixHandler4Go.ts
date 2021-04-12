import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import DocumentUtil from "../../../util/DocumentUtil";

@PostfixHandler({ language: "go", label: "for" })
class ForPostfixHandler4Go extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNotWhileSpaceIndex: number
  ): string | SnippetString | LinetextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(firstNotWhileSpaceIndex, endIndex);
    const newText = `for index, elem := range ${replacement} {\n${DocumentUtil.indentCharacters()}\$1\n}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: firstNotWhileSpaceIndex,
        endIndex: endIndex + 1,
      },
      detail: `postfix`,
      documentation: newText,
    };
  }
}
