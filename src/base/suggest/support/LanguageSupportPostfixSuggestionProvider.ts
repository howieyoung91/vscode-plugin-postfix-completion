import PostfixSuggestion from "../PostfixSuggestion";
import PostfixSuggestionProvider from "../PostfixSuggestionProvider";
import { PostfixSuggestionSupplier } from "../SupplyPostfixSuggestions";

export default abstract class LanguageSupportPostfixSuggestionProvider
    extends PostfixSuggestionProvider
    implements PostfixSuggestionSupplier
{
    protected suggestions: PostfixSuggestion[] = [];
    protected _language: string | null = null;
    protected _triggerCharacters: string[];

    constructor(language: string) {
        super();
        this._language = language;
        this._triggerCharacters = [`.`];
    }

    get triggerCharacters(): string[] {
        return this._triggerCharacters;
    }

    get language(): string | null {
        return this._language;
    }

    public supplyPostfixSuggestions(suggestion: PostfixSuggestion, ...suggestions: PostfixSuggestion[]) {
        this.suggestions.push(suggestion, ...suggestions);
        return this;
    }
}
