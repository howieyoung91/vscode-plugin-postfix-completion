import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "forin" },
  { language: "typescript", label: "forin" },
  { language: "vue", label: "forin" },
  { language: "html", label: "forin" }
)
class ForinPostfixHandler extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    let replacement = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(
        `for (let \${1:i} in ${replacement}){\n${indent()}$2\n}`
      ),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
