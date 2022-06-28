import { Disposable, ExtensionContext, languages } from "vscode";
import BasePostfix from "../../BasePostfix";
import BasePostfixProvider from "../../BasePostfixProvider";
import { ComponentManager } from "../ComponentManager";
import PostfixDisposableRegistry from "../PostfixRegistry";
import ConfigurableLifecycleExtensionContext from "./ConfigurableLifecycleExtensionContext";
import PostfixCompletionConfiguration from "../../config/PostfixConfiguration";

export abstract class AbstractConfigurablePostfixCompletionContext
    implements ConfigurableLifecycleExtensionContext, PostfixDisposableRegistry {
    private static readonly PROVIDERS_KEY = "providers";
    private static readonly POSTFIX_KEY = "postfix";

    public registerPostfix(language: string, postfix: BasePostfix): void {
        let providers = this.getComponentManager().getComponentNotNull(
            AbstractConfigurablePostfixCompletionContext.PROVIDERS_KEY,
            {}
        );
        if (!providers[language]) {
            providers[language] = new BasePostfixProvider(language);
        }
        (providers[language] as BasePostfixProvider).push(postfix);
    }

    /**
     * 激活后缀补全提供器
     */
    protected activateSupportedProviders(languages?: string[]) {
        if (languages.length == 1 && languages[0] === `*`) {
            this.doActivateSupportedProviders();
        } else {
            this.doActivateSupportedProviders(languages);
        }
    }

    protected doActivateSupportedProviders(supportedLanguages?: string[]) {
        let providers: BasePostfixProvider[] = this.getComponentManager().getComponentNotNull("providers", {});
        if (supportedLanguages) {
            for (const language of supportedLanguages) {
                let provider: BasePostfixProvider = providers[language];
                if (provider) {
                    this.doActivate(provider);
                }
            }
            return;
        }

        // 默认全部启用
        for (const language in providers) {
            let provider: BasePostfixProvider = providers[language];
            this.doActivate(provider);
        }
    }

    protected doActivate(provider: BasePostfixProvider) {
        let postfixDisposable = languages.registerCompletionItemProvider(
            provider.language,
            provider,
            ...provider.triggerCharacters
        );
        this.getPostfixDisposables().push(postfixDisposable);
    }

    protected getPostfixDisposables() {
        return this.getComponentManager().getComponentNotNull(
            AbstractConfigurablePostfixCompletionContext.POSTFIX_KEY,
            []
        ) as Disposable[];
    }

    public abstract wrap(rawContext: ExtensionContext): void;

    protected abstract getComponentManager(): ComponentManager;

    public abstract getConfiguration(): PostfixCompletionConfiguration ;

    destroy() {
    }

    start() {
    }

    refresh() {
    }

}
