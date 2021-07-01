import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "cpp", label: "include" },
  { language: "c", label: "include" }
)
class IncludePostfixHandler4Cpp extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    const newText = `#include "${replacement}"`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
