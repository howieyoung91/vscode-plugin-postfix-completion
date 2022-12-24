/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { ExtensionContext, window, workspace } from "vscode";

import { Assert } from "../../../util/Assert";
import { ConfigPropertyKeys } from "../../config/ConfigPropertyKeys";
import { ConfigurationFactory } from "../../config/ConfigurationFactory";
import { buildHandler as buildCustomHandler } from "../../config/JsonPostfixHandler";
import { Configuration } from "../../config/PostfixConfiguration";
import PostfixSuggestion from "../../support/PostfixSuggestion";
import { ComponentManager } from "../ComponentManager";
import PostfixSuggestionRegistry from "../PostfixSuggestionRegistry";

import { AbstractConfigurablePostfixCompletionContext } from "./AbstractConfigurablePostfixCompletionContext";
import ConfigurableLifecycleExtensionContext from "./ConfigurableLifecycleExtensionContext";
import ConfigurablePostfixCompletionContext from "./ConfigurablePostfixSuggestionContext";

/**
 * 插件的运行上下文
 */
export class PostfixCompletionContext
    extends AbstractConfigurablePostfixCompletionContext
    implements ConfigurableLifecycleExtensionContext, PostfixSuggestionRegistry
{
    private vscodeContext: ExtensionContext; // vscode 插件上下文
    private componentManager = new ComponentManager();
    private configuration: Configuration;
    private listeningConfig = false;

    //------------------------------------------------------------------------------------------------------
    //                                           public method
    // -----------------------------------------------------------------------------------------------------

    wrap(vscodeContext: ExtensionContext) {
        this.vscodeContext = vscodeContext;
    }

    start() {
        Assert.notNull(this.getVscodeContext(), "Fail to start. Cause: the vscodeContext is null!");
        this.refresh();
    }

    getConfiguration(): Configuration {
        const configuration = this.configuration ?? ConfigurationFactory.build();
        this.listenConfigurationIfNecessary(); // todo 解耦 listener
        return configuration;
    }

    //------------------------------------------------------------------------------------------------------
    //                                           private method
    // -----------------------------------------------------------------------------------------------------

    private refresh() {
        const configuration = this.getConfiguration();
        this.registerCustomSuggestions(configuration);
        this.activateProviders(configuration.enabledLanguages);
    }

    protected getComponentManager(): ComponentManager {
        return this.componentManager;
    }

    protected getVscodeContext(): ExtensionContext {
        return this.vscodeContext;
    }

    /**
     * listen configuration change event
     */
    private listenConfigurationIfNecessary() {
        if (this.listeningConfig) {
            return;
        }
        this.getVscodeContext().subscriptions.push(
            workspace.onDidChangeConfiguration(e => {
                if (e.affectsConfiguration(ConfigPropertyKeys.ENABLE_LANGUAGES)) {
                    window.showInformationMessage("Restart VSCode please for reloading configuration");
                }
            })
        );
        this.listeningConfig = true;
    }

    private registerCustomSuggestions(configuration: Configuration) {
        for (const suggestionConfig of configuration.customSuggestions) {
            const customPostfixHandler = buildCustomHandler(suggestionConfig);

            if (suggestionConfig.points instanceof Array) {
                for (const point of suggestionConfig.points) {
                    const suggestion = PostfixSuggestion.of(point.label, customPostfixHandler);
                    PluginContext.registerPostfixSuggestion(point.language, suggestion);
                }
            } else if (suggestionConfig.points instanceof Object) {
                const suggestion = PostfixSuggestion.of(suggestionConfig.points.label, customPostfixHandler);
                PluginContext.registerPostfixSuggestion(suggestionConfig.points.language, suggestion);
            }
        }
    }
}

const PluginContext: ConfigurablePostfixCompletionContext = new PostfixCompletionContext();

export { PluginContext };
