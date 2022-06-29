import {
    CancellationToken,
    CompletionContext,
    CompletionItem,
    CompletionItemProvider,
    CompletionList,
    Position,
    ProviderResult,
    TextDocument,
} from "vscode";
import PostfixSuggestion from "./PostfixSuggestion";

export default abstract class PostfixSuggestionProvider implements CompletionItemProvider {
    provideCompletionItems(
        document: TextDocument,
        position: Position,
        token: CancellationToken,
        context: CompletionContext
    ): ProviderResult<CompletionItem[] | CompletionList> {
        return this.provide(document, position, token, context);
    }

    abstract provide(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): PostfixSuggestion[];
}
