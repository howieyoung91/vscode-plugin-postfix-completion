/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { Disposable, ExtensionContext, languages } from "vscode";
import PostfixSuggestion from "../../suggest/PostfixSuggestion";
import DefaultPostfixSuggestionProvider from "../../suggest/support/DefaultPostfixSuggestionProvider";
import { ComponentManager } from "../ComponentManager";
import PostfixCompletionConfiguration from "../../config/PostfixConfiguration";
import ConfigurablePostfixCompletionContext from "./ConfigurablePostfixSuggestionContext";
import { PostfixSuggestionSupplier } from "../../suggest/SupplyPostfixSuggestions";

const KEY = {
    PROVIDERS: "postfixSuggestionSuppliers",
    SUGGESTIONS: "suggestions",
};

export abstract class AbstractConfigurablePostfixCompletionContext implements ConfigurablePostfixCompletionContext {
    public registerPostfixSuggestion(language: string, suggestion: PostfixSuggestion): void {
        const suppliers = this.getComponentManager().getComponentNotNull(KEY.PROVIDERS, {});
        let supplier: PostfixSuggestionSupplier = suppliers[language];
        if (!supplier) {
            supplier = new DefaultPostfixSuggestionProvider(language);
            suppliers[language] = supplier;
        }
        supplier.supplyPostfixSuggestions(suggestion);
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
        let providers: DefaultPostfixSuggestionProvider[] = this.getComponentManager().getComponentNotNull(KEY.PROVIDERS, {});
        if (supportedLanguages != null) {
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
        let disposable = languages.registerCompletionItemProvider(provider.language, provider, ...provider.triggerCharacters);
        this.getPostfixSuggestionDisposables().push(disposable);
    }

    protected getPostfixSuggestionDisposables() {
        return this.getComponentManager().getComponentNotNull(KEY.SUGGESTIONS, []) as Disposable[];
    }

    protected abstract getComponentManager(): ComponentManager;
}
