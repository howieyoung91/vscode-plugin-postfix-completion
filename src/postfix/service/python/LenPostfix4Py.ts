import {CompletionItem, Position, SnippetString, TextEdit} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import {PostfixHandler} from "../../base/decorator/PostfixHandler";
import TextEditUtil from "../../../util/TextEditUtil";

@PostfixHandler({language: "python", label: "len"})
class IfnPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string
  ): string | SnippetString | LinetextHandleResult | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    const replacement = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(`len(${replacement})`),
      detail: "postfix",
      documentation: `len(${replacement})`,
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
