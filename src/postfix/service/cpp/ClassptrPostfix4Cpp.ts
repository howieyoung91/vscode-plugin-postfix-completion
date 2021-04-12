import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import DocumentUtil from "../../../util/DocumentUtil";

@PostfixHandler({ language: "cpp", label: "class" })
class ClassptrPostfixHandler4Cpp extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    const newText = `class ${replacement} {\n${DocumentUtil.getIndentCharacters()}$1\n}`;
    return {
      text: new SnippetString(newText),
      detail: `postfix`,
      documentation: newText,
      deleteText: {
        startIndex: startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
