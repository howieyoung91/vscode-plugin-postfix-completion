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
    // 获取带泛型的类名
    let clazzWithType = replacement
      .substring(4, replacement.indexOf("("))
      .trim();
    // 纯净的类名
    let clazz = clazzWithType;
    let typeIndexInClazz = clazzWithType.indexOf("<");
    // 如果存在泛型
    // 获取纯净的类名
    if (typeIndexInClazz !== -1) {
      // 去除泛型
      clazz = clazzWithType.substring(0, typeIndexInClazz);
      replacement =
        replacement.substring(0, replacement.indexOf("<") + 1) +
        replacement.substring(replacement.lastIndexOf(">"));
    }
    return {
      text: new SnippetString(
        `${clazzWithType} \${1:${clazz.toLowerCase()}} = ${replacement};`
      ),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
