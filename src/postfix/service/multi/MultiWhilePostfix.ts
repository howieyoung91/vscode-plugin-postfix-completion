import {
  SnippetString,
  CompletionItem,
  Position,
  TextEdit,
  Range,
} from "vscode";
import DocumentUtil from "../../../util/DocumentUtil";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
  { language: "java", label: "while" },
  { language: "cpp", label: "while" },
  { language: "javascript", label: "while" }
)
class MultiWhilePostfixHandler extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult {
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 获取数字
    let raw = lineText.substring(startIndex, endIndex);
    return {
      text: new SnippetString(
        `while (${raw}) {\n${DocumentUtil.getIndentCharacters()}$1\n}`
      ).appendTabstop(0),
      detail: `postfix`,
      documentation: `while (${raw}) {\n\n}`,
      datas: {
        startIndex,
        endIndex,
      },
    };
  }

  handleCompletionItem(item: CompletionItem, datas: any) {
    let position: Position = datas.position;
    item.additionalTextEdits = [
      TextEdit.delete(
        new Range(
          new Position(position.line, datas.startIndex),
          new Position(position.line, datas.endIndex + 1)
        )
      ),
    ];
  }
}
