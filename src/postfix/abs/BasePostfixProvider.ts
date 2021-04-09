import { HexBase64Latin1Encoding } from "crypto";
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
} from "vscode";
import Register from "../../util/Register";
import BasePostfix from "./BasePostfix";

/**
 * 后缀补全提供器
 */
export default abstract class BasePostfixProvider
  implements CompletionItemProvider {
  protected _postfixs: BasePostfix[] = [];
  protected _triggerCharacters: string[] = [`.`];
  protected _language: string | null = null;

  constructor(language: string, ...triggerCharacters: string[]) {
    this._language = language;
    this._triggerCharacters = triggerCharacters;
  }

  public push(
    postfix: BasePostfix,
    ...postfixs: BasePostfix[]
  ): BasePostfixProvider {
    this._postfixs.push(postfix, ...postfixs);
    return this;
  }

  public get(index: number) {
    return this._postfixs[index];
  }

  /**
   * 注册到vscode中
   */
  public register(): BasePostfixProvider {
    Register.registerPostfixDispatcher(this);
    return this;
  }

  /**
   * 提供补全项
   * @description 这是一个模板方法
   */
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
      postfix.data.setData({
        document,
        position,
        token,
        context,
      });
      // 初始化参数
      postfixHandler.initArgs(postfix.data.store);
      // 获取行文本
      const line: TextLine = document.lineAt(position);
      let lineText: string = line.text.substring(0, position.character);
      // 处理行文本
      let result = postfixHandler.handleLineText(lineText, postfix.data.store);
      // 如果返回null 则直接返回,不添加item
      if (result === null) {
        continue;
      }
      let text: string | SnippetString | undefined = undefined;
      let documentation: string | undefined = undefined;
      let detail: string | undefined = undefined;
      let args: object | undefined = undefined;
      switch (typeof result) {
        case "object":
          if (result instanceof SnippetString) {
            text = result;
          } else {
            text = result.text;
            documentation = result.documentation;
            detail = result.detail;
            args = result.datas;
          }
          break;
        case "string":
          text = result;
          break;
      }
      // 设置新的文本
      if (text) {
        postfix.insertText = text;
      }
      // 设置新的详情
      if (detail) {
        postfix.detail = detail;
      }
      // 设置新的文档
      if (documentation) {
        postfix.documentation = documentation;
      }
      // 添加参数
      if (args) {
        postfix.data.setData(args);
      }
      // 处理补全项
      postfixHandler.handleCompletionItem(postfix, postfix.data.store);
      // 重置参数
      postfix.data.clearData();
      // 添加补全项
      completionItems.push(postfix);
    }
    return completionItems;
  }

  get postfixs(): BasePostfix[] {
    return this._postfixs;
  }

  get triggerCharacters(): string[] {
    return this._triggerCharacters;
  }

  get language(): string | null {
    return this._language;
  }
}
