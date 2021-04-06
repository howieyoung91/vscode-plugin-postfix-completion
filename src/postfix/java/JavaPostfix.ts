import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionList,
  Position,
  ProviderResult,
  TextDocument,
}
  from
  "vscode";
import BasePostfix from "../abs/BasePostfix";

export default abstract class JavaPostfix extends BasePostfix {
  protected constructor(labelName: string, triggerCharacters: string) {
    super("java", labelName, triggerCharacters);
  }

  abstract provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList>;
}
