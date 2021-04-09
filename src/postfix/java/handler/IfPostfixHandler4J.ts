import BasePostfixHandler from "../../abs/BasePostfixHandler";
import {
  CompletionItem,
  Position,
  Range,
  SnippetString,
  TextEdit,
} from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";
import LineTextHandleResult from "../../abs/LinetextHandleResult";

export default class IfPostfixHandler4J extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    return {
      text: new SnippetString(
        `if (${lineText.substring(
          startIndex,
          endIndex
        )}) {\n${DocumentUtil.getIndentCharacters()}$1\n}`
      ).appendTabstop(0),
      detail: "if postfix",
      documentation: `if (${lineText.substring(startIndex, endIndex)}) {\n\n}`,
      datas: {
        startIndex,
        endIndex,
      },
    };
  }

  // 删除原来的文本
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
