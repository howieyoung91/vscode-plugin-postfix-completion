import { ExtensionContext } from "vscode";
import PostfixCompletionBootstrap from "./PostfixCompletionBootstrap";

// 在这里启动插件
export function activate(context: ExtensionContext) {
  PostfixCompletionBootstrap.start(context);
}

// 在这里销毁插件
export function deactivate() {
  PostfixCompletionBootstrap.end();
}
