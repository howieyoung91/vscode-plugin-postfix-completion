import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "javascript", label: "cast" },
  { language: "typescript", label: "cast" }
)
class CastPostfixHandler extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    let replacement = lineText.substring(startIndex, endIndex).trimEnd();
    if (replacement.length === null) {
      return null;
    }
    return {
      text: new SnippetString(`(<\${1:type}> ${replacement})`),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
