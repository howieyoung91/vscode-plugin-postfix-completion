import {ExtensionContext} from "vscode";
import FastCompleteBootstrap from "./FastCompleteBootstrap";

// 在这里启动插件
export function activate(context: ExtensionContext) {
  FastCompleteBootstrap.start(context);
}

// 在这里销毁插件
export function deactivate() {
  FastCompleteBootstrap.end();
}
