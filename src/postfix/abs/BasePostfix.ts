import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionList,
  Position,
  ProviderResult,
  TextDocument,
  TextLine,
}
  from
  "vscode";
import CodeTipComplete from "../../abs/CodeTipComplete";

export default abstract class BasePostfix extends CodeTipComplete {

  abstract provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList>;


  resolveCompletionItem(item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem> {
    return null;
  }
}
