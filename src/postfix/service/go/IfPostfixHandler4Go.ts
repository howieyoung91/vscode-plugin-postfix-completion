import {SnippetString} from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {PostfixHandler} from "../../base/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({language: "go", label: "if"})
class IfPostfixHandler4Go extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNotWhileSpaceIndex: number
  ): string | SnippetString | LinetextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    let startIndex = firstNotWhileSpaceIndex;
    const replacement = lineText.substring(startIndex, endIndex);
    const newText = `if ${replacement} {\n${DocumentUtil.indentCharacters()}$1\n}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: startIndex,
        endIndex: endIndex + 1,
      },
      detail: `postfix`,
      documentation: newText,
    };
  }
}
