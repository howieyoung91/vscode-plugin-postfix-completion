/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { glob } from "glob";
import { ExtensionContext } from "vscode";
import PostfixCompletionBootstrap from "./PostfixCompletionBootstrap";

// 读入所有 postfix
glob.sync("./components/**/*.js", { cwd: __dirname }).forEach(path => import(path));

// 在这里启动插件
export function activate(context: ExtensionContext) {
    PostfixCompletionBootstrap.start(context);
}

// 在这里销毁插件
export function deactivate() {
    PostfixCompletionBootstrap.end();
}
