import * as vsc from "vscode";
import { items } from "../extension";

let disposable = vsc.commands.registerCommand(
  "fastcomplete4j.helloWorld",
  (uri) => {
    vsc.window.showInformationMessage(
      `当前文件(夹)路径是：${uri ? uri.path : "空"}`
    );
  }
);
items.push(disposable);
let _ = 123;
export { _ };

