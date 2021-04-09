import {
  SnippetString,
  CompletionItem,
  Position,
  TextEdit,
  Range,
} from "vscode";
import DocumentUtil from "../../util/DocumentUtil";
import BasePostfix from "../abs/BasePostfix";
import BasePostfixHandler from "../abs/BasePostfixHandler";
import LineTextHandleResult from "../abs/LinetextHandleResult";
import Postfix from "../decorator/Postfix";
import { PostfixHandler } from "../decorator/PostfixHandler";

@Postfix({ language: "java", label: "if" })
export default class IfPostfix4J extends BasePostfix {}

@PostfixHandler({ language: "java", label: "if" })
class IfPostfixHandler4J extends BasePostfixHandler {
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
