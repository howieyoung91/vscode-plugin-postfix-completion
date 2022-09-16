/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixSuggestion from "../PostfixSuggestion";
import PostfixSuggestionProvider from "../PostfixSuggestionProvider";
import { PostfixSuggestionSupplier } from "../PostfixSuggestionSupplier";

export default abstract class LanguageSupportPostfixSuggestionProvider
    extends PostfixSuggestionProvider
    implements PostfixSuggestionSupplier
{
    protected _language: string | null = null;
    protected _triggerCharacters: string[];
    protected _suggestions: PostfixSuggestion[] = [];

    constructor(language: string) {
        super();
        this._language = language;
        this._triggerCharacters = [`.`];
    }

    public supplyPostfixSuggestions(suggestion: PostfixSuggestion, ...suggestions: PostfixSuggestion[]) {
        this._suggestions.push(suggestion, ...suggestions);
        return this;
    }

    get language(): string | null {
        return this._language;
    }

    get triggerCharacters(): string[] {
        return this._triggerCharacters;
    }

    get suggestions(): PostfixSuggestion[] {
        return this._suggestions;
    }
}
