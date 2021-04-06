import * as vsc from "vscode";
import { Position } from "vscode";
import JavaPostfix from "./JavaPostfix";
import Register from "../../util/Register";

class IfPostfix4Java extends JavaPostfix {
  constructor() {
    super("if", ".");
  }

  handleLineText(lineText: string): string | vsc.SnippetString {
    let startIndex = lineText.lastIndexOf(" ");
    let endIndex = lineText.lastIndexOf(".");
    let snippet = new vsc.SnippetString(
      ` if (${lineText.substring(startIndex + 1, endIndex)}) {\n\t$1\n }`
    );
    snippet.appendTabstop(1);
    return snippet;
  }

  handleCompleteItem(item: vsc.CompletionItem) {
    let position: vsc.Position = this.args.position;
    // 删除原来的文本
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

Register.registerPostfix(new IfPostfix4Java());
