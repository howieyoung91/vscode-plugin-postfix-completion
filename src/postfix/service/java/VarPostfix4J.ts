import { SnippetString } from "vscode";
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
      ),
      detail: `postfix`,
      documentation: `${clazz} varName = ${replacement}`,
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
