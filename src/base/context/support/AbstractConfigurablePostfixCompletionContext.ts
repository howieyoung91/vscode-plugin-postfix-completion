/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { Disposable, ExtensionContext, languages } from "vscode";
import PostfixSuggestion from "../../suggest/PostfixSuggestion";
import DefaultPostfixSuggestionProvider from "../../suggest/support/DefaultPostfixSuggestionProvider";
import { ComponentManager } from "../ComponentManager";
import { Configuration } from "../../config/PostfixConfiguration";
import ConfigurablePostfixCompletionContext from "./ConfigurablePostfixSuggestionContext";
import { PostfixSuggestionSupplier } from "../../suggest/PostfixSuggestionSupplier";
import LanguageSupportedPostfixSuggestionProvider from "../../suggest/support/LanguageSupportPostfixSuggestionProvider";

const Keys = {
    PROVIDERS: "postfixSuggestionSuppliers",
    SUGGESTIONS: "suggestions",
};

export abstract class AbstractConfigurablePostfixCompletionContext implements ConfigurablePostfixCompletionContext {
    public registerPostfixSuggestion(language: string, suggestion: PostfixSuggestion) {
        const providers = this.getComponentManager().getComponentOrDefault(Keys.PROVIDERS, {});
        let provider: PostfixSuggestionSupplier = providers[language];
        if (!provider) {
            provider = new DefaultPostfixSuggestionProvider(language);
            providers[language] = provider;
        }
        provider.supplyPostfixSuggestions(suggestion);
    }

    public abstract wrap(vscodeContext: ExtensionContext): void;

    public abstract getConfiguration(): Configuration;

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

        // 注册到 vscode
        this.registerPostfixIntoVscode();
    }

    protected doActivateSupportedProviders(supportedLanguages?: string[]) {
        const providers = this.getComponentManager().getComponentOrDefault(Keys.PROVIDERS, {});
        if (supportedLanguages) {
            for (const language of supportedLanguages) {
                const provider = providers[language];
                if (provider) {
                    this.doActivate(provider);
                }
            }
        } else {
            for (const language in providers) {
                const provider: DefaultPostfixSuggestionProvider = providers[language];
                this.doActivate(provider);
            }
        }
    }

    protected doActivate(provider: LanguageSupportedPostfixSuggestionProvider) {
        console.log(provider);
        let disposable = languages.registerCompletionItemProvider(provider.language, provider, ...provider.triggerCharacters);
        this.getPostfixSuggestionDisposables().push(disposable);
    }

    protected getPostfixSuggestionDisposables() {
        return this.getComponentManager().getComponentOrDefault(Keys.SUGGESTIONS, []) as Disposable[];
    }

    private registerPostfixIntoVscode() {
        const disposables = this.getPostfixSuggestionDisposables();
        this.getVscodeContext().subscriptions.push(...disposables);
    }

    protected abstract getComponentManager(): ComponentManager;

    protected abstract getVscodeContext(): ExtensionContext;
}
