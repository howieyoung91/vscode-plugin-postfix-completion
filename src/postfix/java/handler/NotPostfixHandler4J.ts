import * as vsc from "vscode";
import { Position, SnippetString } from "vscode";
import PostfixHandler from "../../abs/PostfixHandler";

export default class NotPostfixHandler4J extends PostfixHandler {
  handleLineText(
    lineText: string
  ): { text: string | SnippetString; documentation: string; detail: string } {
    // 截取
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex, endIndex);
    this.args.startIndex = startIndex;
    return {
      text: `!${replacement}`,
      detail: `not postfix`,
      documentation: `!${replacement}`,
    };
  }

  handleCompleteItem(item: vsc.CompletionItem) {
    let position: Position = this.args.position;
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
