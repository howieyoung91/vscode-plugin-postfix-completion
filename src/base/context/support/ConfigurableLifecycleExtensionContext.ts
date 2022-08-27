/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { LifecycleExtensionContext } from "../LifecycleExtensionContext";
import { ExtensionContext } from "vscode";
import { Configuration } from "../../config/PostfixConfiguration";

export default interface ConfigurableLifecycleExtensionContext extends LifecycleExtensionContext {
    wrap(rawContext: ExtensionContext): void;

    getConfiguration(): Configuration;
}
