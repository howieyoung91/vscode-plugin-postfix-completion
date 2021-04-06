import * as vsc from "vscode";
import { Position } from "vscode";
import DocumentUtil from "../../util/DocumentUtil";
import JavaPostfix from "./JavaPostfix";
import Register from "../../util/Register";

class NotPostfix4Java extends JavaPostfix {
  constructor() {
    super("not", ".");
  }

  provideCompletionItems(
    document: vsc.TextDocument,
    position: vsc.Position,
    token: vsc.CancellationToken,
    context: vsc.CompletionContext
  ): vsc.ProviderResult<vsc.CompletionItem[] | vsc.CompletionList> {
    // 行文本
    const line = DocumentUtil.getLineFromDocumentAndPosition(document, position);
    let lineText: string = line.text.substring(0, position.character);
    // 截取
    let startIndex = lineText.lastIndexOf(" ");
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex + 1, endIndex);
    // 返回item
    const items: [string] = [this._labelName];
    return items.map((labelName) => {
      let item = new vsc.CompletionItem(labelName, vsc.CompletionItemKind.Snippet);
      item.additionalTextEdits = [vsc.TextEdit.delete(new vsc.Range(new Position(line.lineNumber, startIndex), position))];
      // 插入的内容
      item.insertText = `!${replacement}`;
      return item;
    });
  }
}

Register.registerPostfix(new NotPostfix4Java());
