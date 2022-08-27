/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { workspace } from "vscode";
import { ConfigPropertyKeys } from "./ConfigPropertyKeys";
import { Configuration } from "./PostfixConfiguration";

export class ConfigurationFactory {
    public static build(): Configuration {
        const config: Configuration = {};
        let vscodeConfig = workspace.getConfiguration();
        let supportedLanguages: string[] = vscodeConfig.get(ConfigPropertyKeys.ENABLE_LANGUAGES);
        if (supportedLanguages === undefined) {
            supportedLanguages = ["*"];
        }
        config.supportedLanguages = supportedLanguages;
        const customSuggestions: [] = vscodeConfig.get(ConfigPropertyKeys.CUSTOM_SUGGESTIONS);
        config.customSuggestions = customSuggestions;
        return config;
    }
}
