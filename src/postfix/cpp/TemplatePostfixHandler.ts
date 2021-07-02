import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "cpp", label: "template" })
class TemplatePostfixHandler4Cpp extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstWihteSpaceIndex: number
  ): LineTextHandleResult {
    let startIndex = firstWihteSpaceIndex;
    let endIndex = lineText.lastIndexOf(".");
    let replacement = lineText.substring(startIndex, endIndex).trimEnd();
    // 这个匹配项要求不出现数字,待优化~
    if (!replacement.match(/^\s*[a-zA-Z_]+[\s+a-zA-Z_]*\s*$/)) {
      return null;
    }
    const types = replacement.trim().trimEnd().split(/\s+/);
    let typeString = ``;
    for (let type of types) {
      typeString += `typename ${type},`;
    }
    typeString = typeString.substring(0, typeString.length - 1);
    const newText = `template <${typeString}>`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
