import BasePostfix from "../abs/BasePostfix";
import Postfix from "../decorator/Postfix";
import {
  CompletionItem,
  Position,
  Range,
  SnippetString,
  TextEdit,
} from "vscode";
import BasePostfixHandler from "../abs/BasePostfixHandler";
import LineTextHandleResult from "../abs/LinetextHandleResult";
import { PostfixHandler } from "../decorator/PostfixHandler";
@Postfix({ language: "java", label: "var" })
export default class VarPostfix4J extends BasePostfix {}
@PostfixHandler({ language: "java", label: "var" })
class VarPostfixHandler4J extends BasePostfixHandler {
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
      text: new SnippetString(
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

  handleCompletionItem(item: CompletionItem, datas: any) {
    let position: Position = datas.position;
    // 删除原来的文本
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
