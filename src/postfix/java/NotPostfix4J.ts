import BasePostfix from "../abs/BasePostfix";
import Postfix from "../decorator/Postfix";
import { CompletionItem, Position, Range, TextEdit } from "vscode";
import BasePostfixHandler from "../abs/BasePostfixHandler";
import LineTextHandleResult from "../abs/LinetextHandleResult";
import { PostfixHandler } from "../decorator/PostfixHandler";

@Postfix({ language: "java", label: "not" })
export default class NotPostfix4J extends BasePostfix {}
@PostfixHandler({ language: "java", label: "not" })
class NotPostfixHandler4J extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult {
    // 截取
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex, endIndex);
    return {
      text: `!${replacement}`,
      detail: `not postfix`,
      documentation: `!${replacement}`,
      datas: { startIndex, endIndex },
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
