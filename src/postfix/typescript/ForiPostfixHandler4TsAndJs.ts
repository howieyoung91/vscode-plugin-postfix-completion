import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "fori" },
  { language: "typescript", label: "fori" }
)
class ForiPostfixHandler4TsAndJs extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    let replacement = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(
        `for (let \${1:i} = 0; \${1:i} < ${replacement}; \${1:i}++) {\n${indent()}$2\n}`
      ),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
