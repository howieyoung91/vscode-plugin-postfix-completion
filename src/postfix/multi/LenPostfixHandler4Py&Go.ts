import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "python", label: "len" },
  { language: "go", label: "len" }
)
// BUG
class LenPostfixHandler extends BasePostfixHandler {
  handleLineText(lineText: string): LinetextHandleResult {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex).trimEnd();
    return {
      text: new SnippetString(`len(${replacement})`),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
