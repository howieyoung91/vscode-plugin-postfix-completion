import PostfixHandler from "../../abs/PostfixHandler";
import {
  CompletionItem,
  Position,
  Range,
  SnippetString,
  TextEdit,
} from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";

export default class IfPostfixHandler4J extends PostfixHandler {
  handleLineText(
    lineText: string
  ):
    | string
    | SnippetString
    | { text: string | SnippetString; documentation?: string; detail?: string }
    | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    this.args.startIndex = startIndex;
    return {
      text: new SnippetString(
        `if (${lineText.substring(
          startIndex,
          endIndex
        )}) {\n${DocumentUtil.getIndentCharacters()}$1\n}`
      ).appendTabstop(0),
      detail: "if postfix",
      documentation: `if (${lineText.substring(startIndex, endIndex)}) {\n\n}`,
    };
  }

  handleCompleteItem(item: CompletionItem) {
    let position: Position = this.args.position;
    // 删除原来的文本
    item.additionalTextEdits = [
      TextEdit.delete(
        new Range(new Position(position.line, this.args.startIndex), position)
      ),
    ];
  }
}
