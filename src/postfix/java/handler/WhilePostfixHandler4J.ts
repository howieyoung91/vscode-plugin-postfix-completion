import PostfixHandler from "../../abs/PostfixHandler";
import {
  CompletionItem,
  Position,
  Range,
  SnippetString,
  TextEdit,
} from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";

export default class WhilePostfixHandler4J extends PostfixHandler {
  handleLineText(
    lineText: string
  ): {
    text: string | SnippetString;
    documentation: string;
    detail: string;
  } {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 获取数字
    let raw = lineText.substring(startIndex, endIndex);
    this.args.startIndex = startIndex;
    return {
      text: new SnippetString(
        `while (${raw}) {\n${DocumentUtil.getIndentCharacters()}$1\n}`
      ).appendTabstop(0),
      detail: `while postfix`,
      documentation: `while (${raw}) {\n\n}`,
    };
  }

  handleCompleteItem(item: CompletionItem) {
    let position: Position = this.args.position;
    item.additionalTextEdits = [
      TextEdit.delete(
        new Range(new Position(position.line, this.args.startIndex), position)
      ),
    ];
  }
}
