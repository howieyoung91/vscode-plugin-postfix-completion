/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { ExtensionContext, window, workspace } from "vscode";
import { Assert } from "../../../util/Assert";
import { ConfigPropertyKeys } from "../../config/ConfigPropertyKeys";
import { ConfigurationFactory } from "../../config/ConfigurationFactory";
import { Configuration } from "../../config/PostfixConfiguration";
import { ComponentManager } from "../ComponentManager";
import PostfixSuggestionRegistry from "../PostfixRegistry";
import { AbstractConfigurablePostfixCompletionContext } from "./AbstractConfigurablePostfixCompletionContext";
import ConfigurableLifecycleExtensionContext from "./ConfigurableLifecycleExtensionContext";
import ConfigurablePostfixCompletionContext from "./ConfigurablePostfixSuggestionContext";
import { buildHandler } from "../../config/JsonPostfixHandler";
import PostfixSuggestion from "../../suggest/PostfixSuggestion";

/**
 * 插件的运行上下文
 */
class PostfixCompletionContext
    extends AbstractConfigurablePostfixCompletionContext
    implements ConfigurableLifecycleExtensionContext, PostfixSuggestionRegistry
{
    private vscodeContext: ExtensionContext;
    private componentManager = new ComponentManager();
    private configuration: Configuration;

    public wrap(vscodeContext: ExtensionContext) {
        this.vscodeContext = vscodeContext;
    }

    public start() {
        Assert.notNull(this.getVscodeContext(), "Fail to init. Cause: the ExtensionContext is null!");
        this.refresh();
    }

    public getConfiguration(): Configuration {
        const config = this.configuration ?? ConfigurationFactory.build();
        // listen configuration change event
        this.getVscodeContext().subscriptions.push(
            workspace.onDidChangeConfiguration(e => {
                if (e.affectsConfiguration(ConfigPropertyKeys.ENABLE_LANGUAGES)) {
                    window.showInformationMessage("Restart VSCode please for reloading configuration");
                }
            })
        );
        return config;
    }

    protected getComponentManager(): ComponentManager {
        return this.componentManager;
    }

    protected getVscodeContext(): ExtensionContext {
        return this.vscodeContext;
    }

    private refresh() {
        // configuration
        let configuration = this.getConfiguration();
        // register providers from json -- configuration
        this.registerMoreSuggestions(configuration);
        // activate providers
        this.activateSupportedProviders(configuration.supportedLanguages);
    }

    private registerMoreSuggestions(configuration: Configuration) {
        for (let config of configuration.customSuggestions) {
            let postfixHandler = buildHandler(config);
            if (config.points instanceof Array) {
                for (let point of config.points) {
                    PluginContext.registerPostfixSuggestion(point.language, PostfixSuggestion.of(point.label, postfixHandler));
                }
            } else if (config.points instanceof Object) {
                PluginContext.registerPostfixSuggestion(config.points.language, PostfixSuggestion.of(config.points.label, postfixHandler));
            }
        }
    }
}

const PluginContext: ConfigurablePostfixCompletionContext = new PostfixCompletionContext();

export { PluginContext };
