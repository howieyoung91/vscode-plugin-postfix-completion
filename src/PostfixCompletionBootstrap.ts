/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */
import { glob } from "glob";
import { ExtensionContext } from "vscode";
import { PluginContext } from "./base/context/support/PostfixCompletionContext";

/**
 * 插件启动器
 */
export abstract class Plugin {
    static prepare(p: string) {
        glob.sync(p, { cwd: __dirname }).forEach(path => import(path));
        console.log(1);
    }

    static startWith(context: ExtensionContext) {
        PluginContext.wrap(context); //! 包装 vscode context
        PluginContext.start();
    }

    static end() {
        PluginContext.destroy();
    }
}
