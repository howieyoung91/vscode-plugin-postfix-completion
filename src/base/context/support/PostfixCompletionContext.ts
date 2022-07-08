/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { ExtensionContext } from "vscode";
import ConfigurationFactory from "../../config/ConfigurationFactory";
import PostfixConfiguration from "../../config/PostfixConfiguration";
import { ComponentManager } from "../ComponentManager";
import PostfixSuggestionRegistry from "../PostfixRegistry";
import { AbstractConfigurablePostfixCompletionContext } from "./AbstractConfigurablePostfixCompletionContext";
import ConfigurableLifecycleExtensionContext from "./ConfigurableLifecycleExtensionContext";
import ConfigurablePostfixCompletionContext from "./ConfigurablePostfixSuggestionContext";

/**
 * 插件的运行上下文
 */
class PostfixCompletionContext
    extends AbstractConfigurablePostfixCompletionContext
    implements ConfigurableLifecycleExtensionContext, PostfixSuggestionRegistry
{
    private rawContext: ExtensionContext;
    private componentManager = new ComponentManager();
    private configuration: PostfixConfiguration;

    public wrap(rawContext: ExtensionContext) {
        this.rawContext = rawContext;
    }

    public start() {
        if (this.rawContext == null) {
            throw new Error(`fail to init. reason: the rawContext is null!`);
        }
        this.refresh();
    }

    private refresh() {
        // config
        let configuration = this.getConfiguration();

        // activate providers
        this.activateSupportedProviders(configuration.supportedLanguages);
    }

    public getConfiguration(): PostfixConfiguration {
        if (this.configuration == undefined) {
            this.configuration = ConfigurationFactory.build();
        }
        return this.configuration;
    }

    protected getComponentManager(): ComponentManager {
        return this.componentManager;
    }

    protected getVscodeExtensionContext(): ExtensionContext {
        return this.rawContext;
    }
}

const CONTEXT: ConfigurablePostfixCompletionContext = new PostfixCompletionContext();

export { CONTEXT };
