import {
  CompletionItem,
  Position,
  Range,
  SnippetString,
  TextEdit,
} from "vscode";
import BasePostfix from "../abs/BasePostfix";
import BasePostfixHandler from "../abs/BasePostfixHandler";

export default class SoutPostfix4J extends BasePostfix {
  constructor() {
    super(new SoutPostfixHandler4J(), `sout`);
  }
}
class SoutPostfixHandler4J extends BasePostfixHandler {
  handleLineText(lineText: string, datas: any): string | SnippetString | null {
    let startIndex = 0;
    //  (somthing).sout -> System.out.println(somthing);
    startIndex = lineText.search(/[\s;\[\]\{\}]\(.*?\).[s]*[o]*[u]*[t]*$/);
    if (startIndex !== -1) {
      let replacement = lineText.substring(
        startIndex,
        lineText.lastIndexOf(")")
      );
      let replacementStartIndex = replacement.indexOf("(") + 1;
      replacement = replacement.substring(replacementStartIndex);
      datas.startIndex = startIndex + replacementStartIndex - 1;
      return `System.out.println(${replacement});`;
    }
    // new somthing.sout -> System.out.println(new somthing);
    startIndex = lineText.search(
      /[\s;\[\](){\}]new\s+(.*?)\(.*?\).[s]*[o]*[u]*[t]*$/
    );
    if (startIndex !== -1) {
      let replacement = lineText.substring(
        startIndex + 1,
        lineText.lastIndexOf(".")
      );
      let replacementStartIndex = replacement.indexOf("new");
      replacement = replacement.substring(replacementStartIndex);
      datas.startIndex = startIndex + replacementStartIndex;
      return `System.out.println(${replacement});`;
    }
    // somthing.sout -> System.out.println(somthing);
    startIndex = lineText.search(/[\s;\[\]\(\)\{\}](.*?).[s]*[o]*[u]*[t]*$/);
    if (startIndex !== -1) {
      let replacement = lineText.substring(
        startIndex,
        lineText.lastIndexOf(".")
      );
      let replacementStartIndex = replacement.indexOf(" ");
      replacement.trim();
      replacement = replacement.substring(replacementStartIndex);
      datas.startIndex = startIndex + replacementStartIndex;
      return `System.out.println(${replacement});`;
    }
    return null;
  }

  handleCompletionItem(item: CompletionItem, datas: any) {
    let position: Position = datas.position;
    // 删除原来的文本
    item.additionalTextEdits = [
      TextEdit.delete(
        new Range(new Position(position.line, datas.startIndex), position)
      ),
    ];
  }
}
