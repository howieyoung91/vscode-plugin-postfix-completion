import { win32 } from "node:path";
import { Disposable, ExtensionContext, window } from "vscode";
import { iocContainer } from "./postfix/decorator/IocContainer";

import("./ImportAll");

let items: Disposable[] = [];
export { items };

export function activate(context: ExtensionContext) {
  iocContainer.register();
  // vsc.commands.registerTextEditorCommand(
  //   'fastcomplete4j.testEditorCommand', (textEditor, edit) => {
  //     vsc.window.showInformationMessage("您正在执行编辑器命令！");
  //     textEditor.insertSnippet
  // console.log(textEditor, edit);
  //   });
  context.subscriptions.push(...items);
}

export function deactivate() {}
