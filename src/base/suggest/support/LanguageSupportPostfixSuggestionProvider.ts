/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixSuggestion from "../PostfixSuggestion";
import PostfixSuggestionProvider from "../PostfixSuggestionProvider";
import { PostfixSuggestionSupplier } from "../SupplyPostfixSuggestions";

export default abstract class LanguageSupportPostfixSuggestionProvider
    extends PostfixSuggestionProvider
    implements PostfixSuggestionSupplier
{
    protected suggestions: PostfixSuggestion[] = [];

    constructor(language: string) {
        super();
        this._language = language;
        this._triggerCharacters = [`.`];
    }

    protected _language: string | null = null;

    // TODO: 实现 session

    get language(): string | null {
        return this._language;
    }

    protected _triggerCharacters: string[];

    get triggerCharacters(): string[] {
        return this._triggerCharacters;
    }

    public supplyPostfixSuggestions(suggestion: PostfixSuggestion, ...suggestions: PostfixSuggestion[]) {
        this.suggestions.push(suggestion, ...suggestions);
        return this;
    }
}
