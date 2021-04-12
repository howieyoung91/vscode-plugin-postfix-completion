import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { SnippetString } from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

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
    let numberString = lineText.substring(startIndex, endIndex);
    // 判断是否是数字
    if (!numberString.match(/^[0-9]+.?[0-9]*$/)) {
      return null;
    }
    return {
      text: new SnippetString(
        `for (int \${1:i} = 0; \${1:i} < ${numberString}; \${1:i}++) {\n${DocumentUtil.indentCharacters()}$2\n}`
      ),
      detail: `postfix`,
      documentation: `for (int \${1:i} = 0; \${1:i} < ${numberString}; \${1:i}++) {\n\n}`,
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
