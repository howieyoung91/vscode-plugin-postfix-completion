/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { workspace, WorkspaceConfiguration } from "vscode";
import { ConfigPropertyKeys } from "./ConfigPropertyKeys";
import { Configuration } from "./PostfixConfiguration";

export class ConfigurationFactory {
    public static build(): Configuration {
        const config: Configuration = {};
        const vscodeConfig = workspace.getConfiguration();
        ConfigurationFactory.readEnabledLanguages(vscodeConfig, config);
        ConfigurationFactory.readCustomSuggestions(vscodeConfig, config);
        return config;
    }

    private static readEnabledLanguages(vscodeConfig: WorkspaceConfiguration, config: Configuration) {
        let supportedLanguages: string[] = vscodeConfig.get(ConfigPropertyKeys.ENABLE_LANGUAGES);
        if (supportedLanguages === undefined) {
            supportedLanguages = ["*"];
        }
        config.enabledLanguages = supportedLanguages;
    }
    private static readCustomSuggestions(vscodeConfig: WorkspaceConfiguration, config: Configuration) {
        const customSuggestions: [] = vscodeConfig.get(ConfigPropertyKeys.CUSTOM_SUGGESTIONS);
        config.customSuggestions = customSuggestions;
    }
}
