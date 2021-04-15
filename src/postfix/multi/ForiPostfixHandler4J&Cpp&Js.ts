import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "java", label: "fori" },
  { language: "c", label: "fori" },
  { language: "cpp", label: "fori" },
  { language: "javascript", label: "fori" },
  { language: "typescript", label: "fori" }
)
class ForiPostfixHandler extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 获取数字
    let replacement = lineText.substring(startIndex, endIndex);
    // if (!numberString.match(/^[0-9]+.?[0-9]*$/)) {
    //   return null;
    // }
    return {
      text: new SnippetString(
        `for (int \${1:i} = 0; \${1:i} < ${replacement}; \${1:i}++) {\n${indent()}$2\n}`
      ),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
