import * as vsc from "vscode";
import { Position, SnippetString } from "vscode";
import LineTextHandleResult from "../../abs/LinetextHandleResult";
import BasePostfixHandler from "../../abs/BasePostfixHandler";

export default class NotPostfixHandler4J extends BasePostfixHandler {
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

  handleCompletionItem(item: vsc.CompletionItem, datas: any) {
    let position: Position = datas.position;
    item.additionalTextEdits = [
      vsc.TextEdit.delete(
        new vsc.Range(
          new Position(position.line, datas.startIndex),
          new Position(position.line, datas.endIndex + 1)
        )
      ),
    ];
  }
}
