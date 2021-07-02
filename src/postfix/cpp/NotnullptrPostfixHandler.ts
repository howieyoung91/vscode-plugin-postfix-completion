import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "cpp", label: "notnullptr" })
class NotnullptrPostfixHandler4Cpp extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstWhiteSpaceIndex: number
  ): LineTextHandleResult {
    let startIndex = firstWhiteSpaceIndex;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex).trimEnd();
    const newText = `if (${replacement} != nullptr){\n${indent()}$1\n}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
