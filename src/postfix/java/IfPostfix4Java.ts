import * as vsc from "vscode";
import { Position } from "vscode";
import JavaPostfix from "./JavaPostfix";
import Register from "../../util/Register";

class IfPostfix4Java extends JavaPostfix {
  constructor() {
    super("if", ".");
  }

  provideCompletionItems(
    document: vsc.TextDocument,
    position: vsc.Position,
    token: vsc.CancellationToken,
    context: vsc.CompletionContext
  ): vsc.ProviderResult<vsc.CompletionItem[] | vsc.CompletionList<vsc.CompletionItem>> {
    // 获取行文本
    const line: vsc.TextLine = document.lineAt(position);
    let lineText: string = line.text.substring(0, position.character);
    let startIndex = lineText.lastIndexOf(" ");
    let endIndex = lineText.lastIndexOf(".");
    // 新增item
    const items: [string] = [this._labelName];
    // 返回item的映射
    return items.map((dep) => {
      let item = new vsc.CompletionItem(dep, vsc.CompletionItemKind.Snippet);
      // 删除原来的文本
      item.additionalTextEdits = [
        vsc.TextEdit.delete(
          new vsc.Range(new Position(line.lineNumber, startIndex), position)
        ),
      ];
      // 插入的内容
      item.insertText = ` if (${lineText.substring(
        startIndex + 1,
        endIndex
      )}) {\n\n }`;
      return item;
    });
  }
}

Register.registerPostfix(new IfPostfix4Java());
