import * as vsc from "vscode";
import {Position} from "vscode";
import PostfixHandler from "../../abs/PostfixHandler";

export default class VarPostfixHandler4J extends PostfixHandler {
  handleLineText(
    lineText: string
  ): null | {
    text: string | vsc.SnippetString;
    documentation: string;
    detail: string;
  } {
    if (!lineText.match(/^(.*?)new (.+?)\(.*\).[v]*[a]*[r]*$/)) {
      return null;
    }
    let startIndex = lineText.lastIndexOf("new");
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex, endIndex);
    // 获取类名
    let clazz = lineText.substring(startIndex + 4, lineText.lastIndexOf("("));
    this.args.startIndex = startIndex;
    return {
      text: new vsc.SnippetString(
        `${clazz} ` + "$" + `{1:${clazz.toLowerCase()}} = ` + `${replacement};`
      ).appendTabstop(0),
      detail: `var postfix`,
      documentation: `${clazz} varName = ${replacement}`,
    };
  }

  handleCompleteItem(item: vsc.CompletionItem) {
    let position: vsc.Position = this.args.position;
    // 删除原来的文本
    item.additionalTextEdits = [
      vsc.TextEdit.delete(
        new vsc.Range(
          new Position(position.line, this.args.startIndex),
          position
        )
      ),
    ];
  }
}
