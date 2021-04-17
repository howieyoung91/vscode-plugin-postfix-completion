import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "java", label: "var" })
class VarPostfixHandler4J extends BasePostfixHandler {
  handleLineText(lineText: string): null | LineTextHandleResult {
    if (!lineText.match(/^\s*new (.+?)\(.*\)[.var]{0,4}$/)) {
      return null;
    }
    let startIndex = lineText.indexOf("new");
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex, endIndex);
    // 获取类名
    let clazz = replacement.substring(
      startIndex + 4,
      lineText.lastIndexOf("(")
    );
    let tempIndex = clazz.indexOf("<");
    if (tempIndex !== -1) {
      clazz = clazz.substring(0, tempIndex);
    }
    return {
      text: new SnippetString(
        `${clazz} \${1:${clazz.toLowerCase()}} = ${replacement};`
      ),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
