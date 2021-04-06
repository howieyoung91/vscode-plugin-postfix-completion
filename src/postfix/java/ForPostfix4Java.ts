import * as vsc from "vscode";
import { Position } from "vscode";
import DocumentUtil from "../../util/DocumentUtil";
import JavaPostfix from "./JavaPostfix";
import Register from "../../util/Register";

class ForPostfix4Java extends JavaPostfix {
  constructor() {
    super("for", ".");
  }

  handleLineText(lineText: string): string | vsc.SnippetString | null {
    let startIndex = lineText.lastIndexOf(" ");
    let endIndex = lineText.lastIndexOf(".");
    // 获取数字
    let numberString = lineText.substring(startIndex + 1, endIndex);
    // 判断是否是数字
    if (!numberString.match(/^[0-9]+.?[0-9]*$/)) {
      return null;
    }
    this.args.startIndex = startIndex;
    return new vsc.SnippetString(
      ` for (int i = 0; i < ${numberString}; i++) {\n\t $1 \n }`
    ).appendTabstop(1);
  }

  handleCompleteItem(item: vsc.CompletionItem) {
    let position: Position = this.args.position;
    item.additionalTextEdits = [
      vsc.TextEdit.delete(
        new vsc.Range(
          new Position(position.line, this.args.startIndex),
          position
        )
      ),
    ];
  }
}

Register.registerPostfix(new ForPostfix4Java());
