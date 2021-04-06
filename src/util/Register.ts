import BasePostfix from "../postfix/abs/BasePostfix";
import { items } from "../extension";
import { languages } from "vscode";

/**
 * 注册器
 */
export default class Register {
  private constructor() {}

  public static registerPostfix(postfix: BasePostfix) {
    let postfixDisposable = languages.registerCompletionItemProvider(
      postfix.language,
      postfix,
      ...postfix.triggerCharacters
    );
    items.push(postfixDisposable);
  }
}
