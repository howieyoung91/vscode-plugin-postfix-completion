import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import DocumentUtil from "../../util/DocumentUtil";
import StringUtil from "../../util/StringUtil";


@PostfixHandler({ language: "python", label: "for" })
class ForPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    firstNonWhiteSpaceIndex: number
  ): LinetextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(firstNonWhiteSpaceIndex, endIndex);
    let newText;
    let documentation;
    let indentChars = DocumentUtil.indentCharacters();
    if (StringUtil.isInt(replacement)) {
      newText = `for \${1:i} in range(${replacement}):\n${indentChars}`;
      documentation = `for \${1:i} in range(${replacement}):\n${indentChars}`;
    } else {
      newText = `for \${1:i} in ${replacement}:\n${indentChars}`;
      documentation = `for \${1:i} in ${replacement}:\n${indentChars}`;
    }
    return {
      text: new SnippetString(newText),
      detail: "postfix",
      documentation: documentation,
      deleteText: {
        startIndex: firstNonWhiteSpaceIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
