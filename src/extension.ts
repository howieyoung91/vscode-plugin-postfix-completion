import {ExtensionContext} from "vscode";
import FastCompleteExtensionBootstrap from "./FastCompleteExtensionBootstrap";

// 在这里启动插件
export function activate(context: ExtensionContext) {
  FastCompleteExtensionBootstrap.start(context);
}

// 在这里销毁插件
export function deactivate() {
  FastCompleteExtensionBootstrap.end();
}
