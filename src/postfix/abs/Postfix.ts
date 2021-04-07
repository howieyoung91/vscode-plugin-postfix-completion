import PostfixHandler from "./PostfixHandler";
import { CompletionItem, CompletionItemKind } from "vscode";
/**
 * 后缀补全
 */
export default class Postfix extends CompletionItem {
  protected readonly _postfixHandler: PostfixHandler;

  constructor(postfixHandler: PostfixHandler, label: string) {
    super(label, CompletionItemKind.Snippet);
    this._postfixHandler = postfixHandler;
  }

  get postfixHandler(): PostfixHandler {
    return this._postfixHandler;
  }
}
