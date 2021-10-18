import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import TargetHandleResult from "../../base/TargetHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "java", label: "foreach" })
class ForeachPostfixHandler extends BasePostfixHandler {
  handleLineText(lineText: string): TargetHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 获取数字
    let replacement = lineText.substring(startIndex, endIndex).trimEnd();
    if (replacement.length === 0) {
      return null;
    }
    let newText = ``;
    // 判断是否是数字
    if (replacement.match(/^[0-9]+.?[0-9]*$/)) {
      newText = `for (int \${1:i} = 0; \${1:i} < ${replacement}; \${1:i}++) {\n${indent()}$0\n}`;
    } else {
      newText = `for (var \${1:item} : ${replacement}) {\n${indent()}$0\n}`;
    }
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
