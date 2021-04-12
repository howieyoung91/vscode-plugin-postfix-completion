import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import {PostfixHandler} from "../../base/decorator/PostfixHandler";
import DocumentUtil from "../../../util/DocumentUtil";

@PostfixHandler({language: "python", label: "notnone"})
class NotNonePostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): string | SnippetString | LinetextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(firstNonWhiteSpaceIndex, endIndex);
    const newText = `if ${replacement} is not None:\n${DocumentUtil.getIndentCharacters()}`;
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
