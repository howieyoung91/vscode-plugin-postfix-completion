import * as vsc from "vscode";
import { Position } from "vscode";
import DocumentUtil from "../../util/DocumentUtil";
import JavaPostfix from "./JavaPostfix";
import Register from "../../util/Register";

class ForPostfix4Java extends JavaPostfix {
  constructor() {
    super("for", ".");
  }

  provideCompletionItems(
    document: vsc.TextDocument,
    position: vsc.Position,
    token: vsc.CancellationToken,
    context: vsc.CompletionContext
  ): vsc.ProviderResult<vsc.CompletionItem[] | vsc.CompletionList> {
    const line = DocumentUtil.getLineFromDocumentAndPosition(
      document,
      position
    );
    let lineText: string = line.text.substring(0, position.character);
    let lastSpaceIndex = lineText.lastIndexOf(" ");
    let dotIndex = lineText.lastIndexOf(".");
    // 获取数字
    let numberString = lineText.substring(lastSpaceIndex + 1, dotIndex);
    // 判断是否是数字
    if (!numberString.match(/^[0-9]+.?[0-9]*$/)) {
      return null;
    }
    let lastSpacePosition = new Position(line.lineNumber, lastSpaceIndex);
    const items: [string] = [this._labelName];
    // 返回item
    return items.map((dep) => {
      let item = new vsc.CompletionItem(dep, vsc.CompletionItemKind.Snippet);
      // 删除原来的文本
      item.additionalTextEdits = [
        vsc.TextEdit.delete(new vsc.Range(lastSpacePosition, position)),
      ];
      var newString = new vsc.SnippetString();
      newString.appendText(
        ` for (int i = 0; i < ${numberString}; i++) {\n\t\n }`
      );
      // 插入的内容
      item.insertText = newString.appendTabstop(1);
      return item;
    });
  }
}

Register.registerPostfix(new ForPostfix4Java());
