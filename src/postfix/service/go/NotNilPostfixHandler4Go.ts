import { SnippetString } from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "go", label: "notnil" })
class NotNilPostfixHandler4Go extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNotWhileSpaceIndex: number
  ): string | SnippetString | LinetextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    return {
      text: new SnippetString(
        `if ${lineText.substring(
          firstNotWhileSpaceIndex,
          endIndex
        )} != nil {\n${DocumentUtil.getIndentCharacters()}$1\n}`
      ),
      deleteText: {
        startIndex: firstNotWhileSpaceIndex,
        endIndex: endIndex + 1,
      },
      detail: `postfix`,
      documentation: `if !${lineText.substring(0, endIndex)} {\n\n}`,
    };
  }
}
