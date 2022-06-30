import PostfixSuggestion from "../suggest/PostfixSuggestion";

export default interface PostfixSuggestionRegistry {
    registerPostfixSuggestion(language: string, postfix: PostfixSuggestion): void;
}
