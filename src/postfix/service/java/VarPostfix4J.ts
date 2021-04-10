import {
  CompletionItem,
  Position,
  Range,
  SnippetString,
  TextEdit,
} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler({ language: "java", label: "var" })
class VarPostfixHandler4J extends BasePostfixHandler {
  handleLineText(lineText: string): null | LineTextHandleResult {
    if (!lineText.match(/^(.*?)new (.+?)\(.*\)[.var]{0,4}$/)) {
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
        `${clazz} \${1:${clazz.toLowerCase()}} = ${replacement};`
      ).appendTabstop(0),
      detail: `postfix`,
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
