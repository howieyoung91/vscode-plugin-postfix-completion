/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { ExtensionContext } from "vscode";
import { CONTEXT } from "./base/context/support/PostfixCompletionContext";

export default class PostfixCompletionBootstrap {
    static start(context: ExtensionContext) {
        CONTEXT.wrap(context);
        CONTEXT.start();
    }

    static end() {
        CONTEXT.destroy();
    }
}
