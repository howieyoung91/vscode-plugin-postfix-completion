import * as vsc from "vscode";
import { Position } from "vscode";
import JavaPostfix from "./JavaPostfix";
import Register from "../../util/Register";

class VarPostfix4Java extends JavaPostfix {
  constructor() {
    super("var", ".");
  }

  handleLineText(lineText: string): string | vsc.SnippetString | null {
    if (!lineText.match(/^(.*?)new (.+?)\(.*\).$/)) {
      return null;
    }
    let startIndex = lineText.lastIndexOf("new");
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex, endIndex);
    // 获取类名
    let clazz = lineText.substring(startIndex + 4, lineText.lastIndexOf("("));
    this.args.startIndex = startIndex;
    return `${clazz} varName = ${replacement};`;
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

Register.registerPostfix(new VarPostfix4Java());
