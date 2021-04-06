import * as vsc from "vscode";
import {Position} from "vscode";
import DocumentUtil from "../../util/DocumentUtil";
import JavaPostfix from "./JavaPostfix";
import Register from "../../util/Register";

class NewPostfix4Java extends JavaPostfix {
  constructor() {
    super("var", ".");
  }

  provideCompletionItems(
    document: vsc.TextDocument,
    position: vsc.Position,
    token: vsc.CancellationToken,
    context: vsc.CompletionContext
  ): vsc.ProviderResult<vsc.CompletionItem[] | vsc.CompletionList> {
    const line = DocumentUtil.getLineFromDocumentAndPosition(document, position);
    let lineText: string = line.text.substring(0, position.character);
    // 判断是否要new一个对象出来
    // /^(\s)*new (.+?)\(.*\).$/
    if (!lineText.match(/^(.*?)new (.+?)\(.*\).$/)) {
      return null;
    }
    let startIndex = lineText.lastIndexOf("new");
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex, endIndex);
    // 获取类名
    let clazz = lineText.substring(startIndex + 4, lineText.lastIndexOf("("));
    // 返回item
    const items: [string] = [this._labelName];
    return items.map((labelName) => {
      let item = new vsc.CompletionItem(labelName, vsc.CompletionItemKind.Snippet);
      item.additionalTextEdits = [vsc.TextEdit.delete(new vsc.Range(new Position(line.lineNumber, startIndex), position))];
      // 插入的内容
      item.insertText = `${clazz} varName = ${replacement};`;
      return item;
    });
  }
}

Register.registerPostfix(new NewPostfix4Java());
