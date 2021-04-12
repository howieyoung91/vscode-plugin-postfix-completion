import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { SnippetString } from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import StringUtil from "../../../util/StringUtil";

@PostfixHandler(
  { language: "java", label: "forr" },
  { language: "c", label: "forr" },
  { language: "cpp", label: "forr" },
  { language: "javascript", label: "forr" },
  { language: "typescript", label: "forr" }
)
class ForrPostfixHandler extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 获取数字
    let numberString = lineText.substring(startIndex, endIndex);
    // 判断是否是数字
    if (!StringUtil.isNumber(numberString)) {
      return null;
    }
    return {
      text: new SnippetString(
        `for (int \${1:i} = ${numberString}; \${1:i} >= 0; \${1:i}--) {\n${DocumentUtil.indentCharacters()}$2\n}`
      ),
      detail: `postfix`,
      documentation: `for (int \${1:i} = ${numberString}; \${1:i} >= 0; \${1:i}--) {\n\n}`,
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
