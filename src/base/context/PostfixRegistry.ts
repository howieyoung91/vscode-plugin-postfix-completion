import PostfixSuggestion from "../PostfixSuggestion";

export default interface PostfixSuggestionRegistry {
    registerPostfixSuggestion(language: string, postfix: PostfixSuggestion): void;
}
