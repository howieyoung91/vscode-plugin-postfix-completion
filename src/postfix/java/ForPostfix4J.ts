import BasePostfix from "../abs/BasePostfix";
import Postfix from "../decorator/Postfix";
import { PostfixHandler } from "../decorator/PostfixHandler";
import {
  SnippetString,
  CompletionItem,
  Position,
  TextEdit,
  Range,
} from "vscode";
import DocumentUtil from "../../util/DocumentUtil";
import BasePostfixHandler from "../abs/BasePostfixHandler";
import LineTextHandleResult from "../abs/LinetextHandleResult";

@Postfix({ language: "java", label: "for" })
export default class ForPostfix4J extends BasePostfix {}
@PostfixHandler({ language: "java", label: "for" })
class ForPostfixHandler4J extends BasePostfixHandler {
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
        `for (int i = 0; i < ${numberString}; i++) {\n${DocumentUtil.getIndentCharacters()}$1\n}`
      ).appendTabstop(0),
      detail: `for postfix`,
      documentation: `for (int i = 0; i < ${numberString}; i++) {\n\n}`,
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
