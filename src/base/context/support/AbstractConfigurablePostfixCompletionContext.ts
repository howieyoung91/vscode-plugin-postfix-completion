import { Disposable, ExtensionContext, languages } from "vscode";
import PostfixSuggestion from "../../PostfixSuggestion";
import DefaultPostfixSuggestionProvider from "../../DefaultPostfixSuggestionProvider";
import { ComponentManager } from "../ComponentManager";
import PostfixCompletionConfiguration from "../../config/PostfixConfiguration";
import ConfigurablePostfixCompletionContext from "./ConfigurablePostfixSuggestionContext";

export abstract class AbstractConfigurablePostfixCompletionContext implements ConfigurablePostfixCompletionContext {
    private static readonly PROVIDERS_KEY = "providers";
    private static readonly POSTFIX_KEY = "postfix";

    public registerPostfixSuggestion(language: string, postfix: PostfixSuggestion): void {
        let providers = this.getComponentManager().getComponentNotNull(
            AbstractConfigurablePostfixCompletionContext.PROVIDERS_KEY,
            {}
        );
        if (!providers[language]) {
            providers[language] = new DefaultPostfixSuggestionProvider(language);
        }
        (providers[language] as DefaultPostfixSuggestionProvider).push(postfix);
    }

    public abstract wrap(rawContext: ExtensionContext): void;

    public abstract getConfiguration(): PostfixCompletionConfiguration;

    destroy() {}

    start() {}

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
        let providers: DefaultPostfixSuggestionProvider[] = this.getComponentManager().getComponentNotNull("providers", {});
        if (supportedLanguages) {
            for (const language of supportedLanguages) {
                let provider: DefaultPostfixSuggestionProvider = providers[language];
                if (provider) {
                    this.doActivate(provider);
                }
            }
            return;
        }

        // 默认全部启用
        for (const language in providers) {
            let provider: DefaultPostfixSuggestionProvider = providers[language];
            this.doActivate(provider);
        }
    }

    protected doActivate(provider: DefaultPostfixSuggestionProvider) {
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

    protected abstract getComponentManager(): ComponentManager;
}
