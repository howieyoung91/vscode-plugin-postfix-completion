import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { SnippetString, CompletionItem, Position } from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import TextEditUtil from "../../../util/TextEditUtil";
import StringUtil from "../../../util/StringUtil";

@PostfixHandler(
  { language: "java", label: "forr" },
  { language: "cpp", label: "forr" },
  { language: "javascript", label: "forr" }
)
class MultiForiPostfixHandler extends BasePostfixHandler {
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
        `for (int \${1:i} = ${numberString}; \${1:i} >= 0; \${1:i}--) {\n${DocumentUtil.getIndentCharacters()}$2\n}`
      ).appendTabstop(0),
      detail: `postfix`,
      documentation: `for (int \${1:i} = ${numberString}; \${1:i} >= 0; \${1:i}--) {\n\n}`,
      datas: {
        startIndex,
        endIndex,
      },
    };
  }

  handleCompletionItem(item: CompletionItem, datas: any) {
    let position: Position = datas.position;
    item.additionalTextEdits = [
      TextEditUtil.ATextEditToDeleteBetween(
        position.line,
        datas.startIndex,
        datas.endIndex + 1
      ),
    ];
  }
}
