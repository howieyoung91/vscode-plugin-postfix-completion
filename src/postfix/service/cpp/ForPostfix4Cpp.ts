import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import {
  SnippetString,
  CompletionItem,
  Position,
  TextEdit,
  Range,
} from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "cpp", label: "for" })
class ForPostfixHandler4Cpp extends BasePostfixHandler {
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
        `for (int \${1:i} = 0; \${1:i} < ${numberString}; \${1:i}++) {\n${DocumentUtil.getIndentCharacters()}$2\n}`
      ).appendTabstop(0),
      detail: `for postfix`,
      documentation: `for (int \${1:i} = 0; \${1:i} < ${numberString}; \${1:i}++) {\n\n}`,
      datas: {
        startIndex,
        endIndex,
      },
    };
  }

  handleCompletionItem(item: CompletionItem, datas: any) {
    let position: Position = datas.position;
    item.additionalTextEdits = [
      TextEdit.delete(
        new Range(
          new Position(position.line, datas.startIndex),
          new Position(position.line, datas.endIndex + 1)
        )
      ),
    ];
  }
}
