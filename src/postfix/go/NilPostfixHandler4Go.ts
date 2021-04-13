import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import DocumentUtil from "../../util/DocumentUtil";


@PostfixHandler({language: "go", label: "nil"})
class NilPostfixHandler4Go extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNotWhileSpaceIndex: number
  ): string | SnippetString | LinetextHandleResult {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(
      firstNotWhileSpaceIndex,
      endIndex
    );
    const newText = `if ${replacement} == nil {\n${DocumentUtil.indentCharacters()}$1\n}`;
    return {
      text: new SnippetString(
        newText
      ),
      deleteText: {
        startIndex: firstNotWhileSpaceIndex,
        endIndex: endIndex + 1,
      },
      detail: `postfix`,
      documentation: newText,
    };
  }
}
