import { ExtensionContext } from "vscode";
import { ComponentManager } from "../ComponentManager";
import PostfixDisposableRegistry from "../PostfixRegistry";
import { AbstractConfigurablePostfixCompletionContext } from "./AbstractConfigurablePostfixCompletionContext";
import ConfigurableLifecycleExtensionContext from "./ConfigurableLifecycleExtensionContext";
import PostfixConfiguration from "../../config/PostfixConfiguration";
import ConfigurationFactory from "../../config/ConfigurationFactory";

/**
 * 插件的运行上下文
 */
class PostfixCompletionContext
    extends AbstractConfigurablePostfixCompletionContext
    implements ConfigurableLifecycleExtensionContext, PostfixDisposableRegistry
{
    private rawContext: ExtensionContext;
    private componentManager = new ComponentManager();
    protected configuration: PostfixConfiguration;

    public getConfiguration(): PostfixConfiguration {
        if (this.configuration == undefined) {
            this.configuration = ConfigurationFactory.build();
        }
        return this.configuration;
    }

    public wrap(rawContext: ExtensionContext) {
        this.rawContext = rawContext;
    }

    public start() {
        if (this.rawContext == null) {
            throw Error(`fail to init. reason: the rawContext is null!`);
        }
        this.refresh();
    }

    public refresh() {
        // config
        let configuration = this.getConfiguration();
        this.activateSupportedProviders(configuration.supportedLanguages);

        // register disposable
        const postfixes = this.getPostfixDisposables();
        this.rawContext.subscriptions.push(...postfixes);
    }

    protected getComponentManager(): ComponentManager {
        return this.componentManager;
    }
}

const CONTEXT = new PostfixCompletionContext();

export { CONTEXT };
