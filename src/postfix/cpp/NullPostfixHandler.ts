import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "c", label: "null" })
class NullPostfixHandler4C extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstWhiteSpaceIndex: number
  ): LineTextHandleResult {
    let startIndex = firstWhiteSpaceIndex;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    const newText = `if (${replacement} == NULL){\n${indent()}$1\n}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
