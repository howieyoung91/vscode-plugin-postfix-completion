import * as vsc from "vscode";
import { Position } from "vscode";
import LineTextHandleResult from "../../abs/LinetextHandleResult";
import BasePostfixHandler from "../../abs/BasePostfixHandler";
import "reflect-metadata";

export default class VarPostfixHandler4J extends BasePostfixHandler {
  handleLineText(lineText: string): null | LineTextHandleResult {
    if (!lineText.match(/^(.*?)new (.+?)\(.*\).[v]*[a]*[r]*$/)) {
      return null;
    }
    let startIndex = lineText.lastIndexOf("new");
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex, endIndex);
    // 获取类名
    let clazz = lineText.substring(startIndex + 4, lineText.lastIndexOf("("));
    return {
      text: new vsc.SnippetString(
        `${clazz} ` + "$" + `{1:${clazz.toLowerCase()}} = ` + `${replacement};`
      ).appendTabstop(0),
      detail: `var postfix`,
      documentation: `${clazz} varName = ${replacement}`,
      datas: {
        startIndex,
        endIndex,
      },
    };
  }

  handleCompletionItem(item: vsc.CompletionItem, datas: any) {
    let position: vsc.Position = datas.position;
    // 删除原来的文本
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
