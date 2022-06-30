import PostfixSuggestion from "./PostfixSuggestion";

export interface PostfixSuggestionSupplier {
    supplyPostfixSuggestions(suggestion: PostfixSuggestion, ...suggestions: PostfixSuggestion[]): any;
}
