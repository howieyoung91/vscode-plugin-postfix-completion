import { languages } from "vscode";
import BasePostfixProvider from "../base/BasePostfixProvider";
import { items } from "../base/context/FastCompleteExtensionContext";

/**
 * 注册器
 */
export default class Registry {
  private constructor() { }
  
  /**
   * 注册分发器
   */
  public static registerPostfixProvider(
    postfixDispatcher: BasePostfixProvider
  ) {
    if (postfixDispatcher.language === null) {
      throw Error(`register failed! reason: the language is null!`);
    }
    let postfixDisposable = languages.registerCompletionItemProvider(
      postfixDispatcher.language,
      postfixDispatcher,
      ...postfixDispatcher.triggerCharacters
    );
    items.push(postfixDisposable);
  }
}
