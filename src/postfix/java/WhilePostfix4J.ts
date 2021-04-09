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

@Postfix({ language: "java", label: "while" })
export default class WhilePostfix4J extends BasePostfix {}
@PostfixHandler({ language: "java", label: "while" })
class WhilePostfixHandler4J extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 获取数字
    let raw = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(
        `while (${raw}) {\n${DocumentUtil.getIndentCharacters()}$1\n}`
      ).appendTabstop(0),
      detail: `while postfix`,
      documentation: `while (${raw}) {\n\n}`,
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
