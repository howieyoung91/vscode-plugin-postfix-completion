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
import BaseComplete from "./BaseComplete";

export default abstract class CodeTipComplete
  extends BaseComplete
  implements CompletionItemProvider {
  protected _triggerCharacters: string[];
  protected _labelName: string;

  protected constructor(
    language: string,
    labelName: string,
    ...triggerCharacters: string[]
  ) {
    super(language);
    this._triggerCharacters = triggerCharacters;
    this._labelName = labelName;
  }

  abstract provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>>;

  resolveCompletionItem?(
    item: CompletionItem,
    token: CancellationToken
  ): ProviderResult<CompletionItem>;

  get triggerCharacters(): string[] {
    return this._triggerCharacters;
  }
}
