import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
  { language: "python", label: "len" },
  { language: "go", label: "len" }
)
// BUG
class LenPostfixHandler extends BasePostfixHandler {
  handleLineText(
    lineText: string
  ): string | SnippetString | LinetextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(`len(${replacement})`),
      detail: "postfix",
      documentation: `len(${replacement})`,
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
