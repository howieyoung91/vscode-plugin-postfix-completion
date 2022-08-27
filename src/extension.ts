/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { ExtensionContext } from "vscode";
import { Plugin } from "./PostfixCompletionBootstrap";

const COMPONENTS_PATH = "./components/**/*.js";

// -------------------------------------------------------------
//                          准备插件
// -------------------------------------------------------------
Plugin.prepare(COMPONENTS_PATH);

// -------------------------------------------------------------
//                          启动插件
// -------------------------------------------------------------
export function activate(vscodeContext: ExtensionContext) {
    Plugin.startWith(vscodeContext);
}

// -------------------------------------------------------------
//                          销毁插件
// -------------------------------------------------------------
export function deactivate() {
    Plugin.end();
}
