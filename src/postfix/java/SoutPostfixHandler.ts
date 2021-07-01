import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {PostfixHandler} from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({language: "java", label: "sout"})
class SoutPostfixHandler4J extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhitespaceCharacterIndex: number
  ): LineTextHandleResult {
    let res = {
      text: null,
      deleteText: null,
    };
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText
      .substring(firstNonWhitespaceCharacterIndex, endIndex)
      .trimEnd();
    // 判断是否为空
    if (replacement.length === 0) {
      res.text = new SnippetString(`System.out.println($1);`);
    } else {
      res.text = new SnippetString(`System.out.println(${replacement});`);
      res.deleteText = {
        startIndex: firstNonWhitespaceCharacterIndex,
        endIndex: endIndex + 1,
      };
    }
    return res;
  }
}
