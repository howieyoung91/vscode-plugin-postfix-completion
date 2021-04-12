import BasePostfixHandler from "./BasePostfixHandler";
import { CompletionItem, CompletionItemKind } from "vscode";
import Store from "./Store";
/**
 * 后缀补全基类
 */
export default class BasePostfix extends CompletionItem {
  protected _postfixHandler: BasePostfixHandler;
  protected _datas: Store = new Store();

  constructor(postfixHandler: BasePostfixHandler, label: string) {
    super(label, CompletionItemKind.Snippet);
    this._postfixHandler = postfixHandler;
  }

  set postfixHandler(value: BasePostfixHandler) {
    this._postfixHandler = value;
  }

  set datas(value: Store) {
    this._datas = value;
  }

  get datas(): Store {
    return this._datas;
  }

  get postfixHandler(): BasePostfixHandler {
    return this._postfixHandler;
  }
}
