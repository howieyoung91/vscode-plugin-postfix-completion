import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemProvider,
  CompletionList,
  Position,
  ProviderResult,
  SnippetString,
  TextDocument,
  TextLine,
  window,
} from "vscode";
import Register from "../../util/Register";
import Postfix from "./Postfix";
/**
 * 后缀补全分发器
 */
export default abstract class PostfixDispatcher
  implements CompletionItemProvider {
  protected _postfixs: Postfix[] = [];
  protected _triggerCharacters: string[] = [`.`];
  protected _language: string | null = null;

  constructor(language: string, ...triggerCharacters: string[]) {
    this._language = language;
    this._triggerCharacters = triggerCharacters;
  }

  public push(postfix: Postfix, ...postfixs: Postfix[]) {
    this._postfixs.push(postfix, ...postfixs);
  }

  public get(index: number) {
    return this._postfixs[index];
  }

  /**
   * 注册到vscode中
   */
  public register(): PostfixDispatcher {
    Register.registerPostfixDispatcher(this);
    return this;
  }

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    let completionItems: CompletionItem[] = [];
    for (const postfix of this._postfixs) {
      // 设置参数
      let postfixHandler = postfix.postfixHandler;
      postfixHandler.setArg("document", document);
      postfixHandler.setArg("position", position);
      postfixHandler.setArg("token", token);
      postfixHandler.setArg("context", context);
      // 初始化参数
      postfixHandler.initArgs();
      // 获取行文本
      const line: TextLine = document.lineAt(position);
      let lineText: string = line.text.substring(0, position.character);
      // 处理行文本
      let result = postfixHandler.handleLineText(lineText);
      // 如果返回null 则直接返回,不添加item
      if (result === null) {
        continue;
      }
      let newText: string | SnippetString | undefined = undefined;
      let documentation: string | undefined = undefined;
      let detail: string | undefined = undefined;
      switch (typeof result) {
        case "object":
          if (result instanceof SnippetString) {
            newText = result;
          } else {
            newText = result.text;
            documentation = result.documentation;
            detail = result.detail;
          }
          break;
        case "string":
          newText = result;
          break;
      }
      // 设置新的文本
      if (newText) {
        postfix.insertText = newText;
      }
      // 设置新的详情
      if (detail) {
        postfix.detail = detail;
      }
      // 设置新的文档
      if (documentation) {
        postfix.documentation = documentation;
      }
      // 处理补全项
      postfixHandler.handleCompleteItem(postfix);
      // 重置参数
      postfixHandler.clearArg();
      // 添加补全项
      completionItems.push(postfix);
    }
    return completionItems;
  }

  get postfixs(): Postfix[] {
    return this._postfixs;
  }

  get triggerCharacters(): string[] {
    return this._triggerCharacters;
  }

  get language(): string | null {
    return this._language;
  }
}
