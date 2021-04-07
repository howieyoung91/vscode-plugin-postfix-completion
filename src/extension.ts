import * as vsc from "vscode";
import { Disposable } from "vscode";

import("./ImportAll");

let items: Disposable[] = [];
export { items };

export function activate(context: vsc.ExtensionContext) {
  // vsc.commands.registerTextEditorCommand(
  //   'fastcomplete4j.testEditorCommand', (textEditor, edit) => {
  //     vsc.window.showInformationMessage("您正在执行编辑器命令！");
  //     textEditor.insertSnippet
  // console.log(textEditor, edit);
  //   });
  context.subscriptions.push(...items);
}

export function deactivate() {}
