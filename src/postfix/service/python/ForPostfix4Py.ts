import { CompletionItem, Position, SnippetString, TextEdit } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import TextEditUtil from "../../../util/TextEditUtil";
import DocumentUtil from "../../../util/DocumentUtil";
import StringUtil from "../../../util/StringUtil";

@PostfixHandler({ language: "python", label: "for" })
class ForPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(lineText: string): LinetextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    if (!StringUtil.isInt(replacement)) {
      return null;
    }
    return {
      text: new SnippetString(
        `for \${1:i} in range(${replacement}):\n${DocumentUtil.getIndentCharacters()}`
      ),
      detail: "postfix",
      documentation: `for i in range(${replacement}):\n`,
      datas: {
        startIndex,
        endIndex,
      },
    };
  }

  handleCompletionItem(item: CompletionItem, datas: any) {
    let position: Position = datas.position;
    item.additionalTextEdits = [
      TextEditUtil.ATextEditToDeleteBetween(
        position.line,
        datas.startIndex,
        datas.endIndex + 1
      ),
    ];
  }
}
