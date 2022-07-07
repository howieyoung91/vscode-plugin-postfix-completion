/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { workspace } from "vscode";
import { CONSTANT } from "./Constant";
import PostfixCompletionConfiguration from "./PostfixConfiguration";

const CONFIG: PostfixCompletionConfiguration = {
    supportedLanguages: [],
};

export default class ConfigurationFactory {
    public static build(): PostfixCompletionConfiguration {
        let configuration = workspace.getConfiguration();
        let supportedLanguages: string[] = configuration.get(CONSTANT.PROPERTY.SUPPORTED_LANGUAGES);
        if (supportedLanguages === undefined) {
            supportedLanguages = ["*"];
        }
        CONFIG.supportedLanguages = supportedLanguages;
        return CONFIG;
    }
}

export { CONFIG };
