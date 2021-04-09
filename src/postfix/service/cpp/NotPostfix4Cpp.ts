import { CompletionItem, Position, Range, TextEdit } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler({ language: "cpp", label: "not" })
class NotPostfixHandler4Cpp extends BasePostfixHandler {
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
