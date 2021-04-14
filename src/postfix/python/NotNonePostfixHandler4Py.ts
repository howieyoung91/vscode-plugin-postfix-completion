import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import DocumentUtil from "../../util/DocumentUtil";


@PostfixHandler({language: "python", label: "notnone"})
class NotNonePostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): string | SnippetString | LinetextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(firstNonWhiteSpaceIndex, endIndex);
    const newText = `if ${replacement} is not None:\n${DocumentUtil.indentCharacters()}`;
    return {
      text: new SnippetString(newText),
      detail: "postfix",
      documentation: newText,
      deleteText: {
        startIndex: firstNonWhiteSpaceIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}