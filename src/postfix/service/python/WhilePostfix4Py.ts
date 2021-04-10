import { CompletionItem, Position, SnippetString, TextEdit } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import TextEditUtil from "../../../util/TextEditUtil";
import DocumentUtil from "../../../util/DocumentUtil";

@PostfixHandler({ language: "python", label: "while" })
class IfnPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(lineText: string): LinetextHandleResult {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(
        `while ${replacement}:\n${DocumentUtil.getIndentCharacters()}`
      ),
      detail: "postfix",
      documentation: `while ${replacement}:\n`,
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
