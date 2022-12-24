/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { Disposable, ExtensionContext, languages } from "vscode";
import PostfixSuggestion from "../../support/PostfixSuggestion";
import DefaultPostfixSuggestionProvider from "../../support/suggest/DefaultPostfixSuggestionProvider";
import { ComponentManager } from "../ComponentManager";
import { Configuration } from "../../config/PostfixConfiguration";
import ConfigurablePostfixCompletionContext from "./ConfigurablePostfixSuggestionContext";
import { PostfixSuggestionSupplier } from "../../support/PostfixSuggestionSupplier";
import LanguageSupportedPostfixSuggestionProvider from "../../support/suggest/LanguageSupportPostfixSuggestionProvider";

const Keys = {
    PROVIDERS: "postfixSuggestionSuppliers",
    SUGGESTIONS: "suggestions",
};

export abstract class AbstractConfigurablePostfixCompletionContext implements ConfigurablePostfixCompletionContext {
    //---------------------------------------------------------------------------------------------
    //                                     public methods
    //---------------------------------------------------------------------------------------------

    registerPostfixSuggestion(language: string, suggestion: PostfixSuggestion) {
        const providers = this.getProviders();
        let provider: PostfixSuggestionSupplier = providers[language];
        if (!provider) {
            provider = new DefaultPostfixSuggestionProvider(language);
            providers[language] = provider;
        }
        provider.addPostfixSuggestions(suggestion); // 把 suggestions 添加进入 provider
    }

    destroy() {} // default empty
    start() {} // default empty

    /**
     * 对 vscode 插件环境做包装，由子类实现
     */
    abstract wrap(vscodeContext: ExtensionContext): void;
    abstract getConfiguration(): Configuration;
    protected abstract getComponentManager(): ComponentManager;
    protected abstract getVscodeContext(): ExtensionContext;

    //---------------------------------------------------------------------------------------------
    //                                    private methods
    //---------------------------------------------------------------------------------------------
    /**
     * 激活后缀补全提供器
     */
    protected activateProviders(languages?: string[]) {
        if (languages.length == 1 && languages[0] === `*`) {
            this.doActivateProviders();
        } else {
            this.doActivateProviders(languages);
        }

        // 注册到 vscode
        this.registerPostfixIntoVscode();
    }

    protected doActivateProviders(enabledLanguages?: string[]) {
        const providers: any = this.getProviders();
        if (enabledLanguages) {
            for (const language of enabledLanguages) {
                const provider = providers[language];
                if (provider) {
                    this.doActivate(provider);
                }
            }
        } else {
            // activate all
            for (const language in providers) {
                this.doActivate(providers[language]);
            }
        }
    }

    protected doActivate(provider: LanguageSupportedPostfixSuggestionProvider) {
        console.log(provider);
        const disposable = languages.registerCompletionItemProvider(provider.language, provider, ...provider.triggerCharacters);
        this.getPostfixSuggestionDisposables().push(disposable);
    }

    private registerPostfixIntoVscode() {
        const disposables = this.getPostfixSuggestionDisposables();
        this.getVscodeContext().subscriptions.push(...disposables);
    }

    protected getProviders() {
        return this.getComponentManager().getComponentOrDefault(Keys.PROVIDERS, {});
    }

    protected getPostfixSuggestionDisposables() {
        return this.getComponentManager().getComponentOrDefault(Keys.SUGGESTIONS, []) as Disposable[];
    }
}
