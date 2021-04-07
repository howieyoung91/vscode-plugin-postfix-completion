import PostfixHandler from "../../abs/PostfixHandler";
import {
  CompletionItem,
  Position,
  Range,
  SnippetString,
  TextEdit,
} from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";

export default class ForPostfixHandler4J extends PostfixHandler {
  handleLineText(
    lineText: string
  ): {
    text: string | SnippetString;
    detail: string;
    documentation: string;
  } | null {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 获取数字
    let numberString = lineText.substring(startIndex, endIndex);
    // 判断是否是数字
    if (!numberString.match(/^[0-9]+.?[0-9]*$/)) {
      return null;
    }
    this.args.startIndex = startIndex;
    return {
      text: new SnippetString(
        `for (int i = 0; i < ${numberString}; i++) {\n${DocumentUtil.getIndentCharacters()}$1\n}`
      ).appendTabstop(0),
      detail: `for postfix`,
      documentation: `for (int i = 0; i < ${numberString}; i++) {\n\n}`,
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
