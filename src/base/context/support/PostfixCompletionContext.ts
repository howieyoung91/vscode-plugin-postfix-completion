import { ExtensionContext } from "vscode";
import { ComponentManager } from "../ComponentManager";
import PostfixSuggestionRegistry from "../PostfixRegistry";
import { AbstractConfigurablePostfixCompletionContext } from "./AbstractConfigurablePostfixCompletionContext";
import ConfigurableLifecycleExtensionContext from "./ConfigurableLifecycleExtensionContext";
import PostfixConfiguration from "../../config/PostfixConfiguration";
import ConfigurationFactory from "../../config/ConfigurationFactory";
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
            throw Error(`fail to init. reason: the rawContext is null!`);
        }
        this.refresh();
    }

    private refresh() {
        // config
        let configuration = this.getConfiguration();
        this.activateSupportedProviders(configuration.supportedLanguages);

        // register disposable
        const postfixes = this.getPostfixDisposables();
        this.rawContext.subscriptions.push(...postfixes);
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
}

const CONTEXT: ConfigurablePostfixCompletionContext = new PostfixCompletionContext();

export { CONTEXT };
