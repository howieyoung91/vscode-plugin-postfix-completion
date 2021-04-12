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
import Register from "../../util/Registry";
import TextEditUtil from "../../util/TextEditUtil";
import BasePostfix from "./BasePostfix";

/**
 * 后缀补全提供器
 */
export default class BasePostfixProvider implements CompletionItemProvider {
  protected _postfixs: BasePostfix[] = [];
  protected _triggerCharacters: string[] = [`.`];
  protected _language: string | null = null;

  constructor(language: string, ...triggerCharacters: string[]) {
    this._language = language;
    this._triggerCharacters = [`.`];
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
    // console.log("register!");
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
      postfix.datas.setData({
        document,
        position,
        token,
        context,
      });
      // 初始化参数
      postfixHandler.initArgs(postfix.datas.store);
      // 获取行文本
      const line: TextLine = document.lineAt(position);
      let lineText: string = line.text.substring(0, position.character);
      // 处理行文本
      let result = postfixHandler.handleLineText(
        lineText,
        line.firstNonWhitespaceCharacterIndex,
        postfix.datas.store
      );
      // 如果返回null 则直接返回,不添加item
      if (result === null) {
        continue;
      }
      let text: string | SnippetString | undefined = undefined;
      let documentation: string | undefined = undefined;
      let detail: string | undefined = undefined;
      let datas: object | undefined = undefined;
      let deleteText: { startIndex; endIndex } | undefined = undefined;
      switch (typeof result) {
        case "object":
          if (result instanceof SnippetString) {
            text = result;
          } else {
            text = result.text;
            documentation = result.documentation;
            detail = result.detail;
            datas = result.datas;
            deleteText = result.deleteText;
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
      if (datas) {
        postfix.datas.setData(datas);
      }
      // 是否删除原有文本
      if (deleteText) {
        postfix.additionalTextEdits = [
          TextEditUtil.ATextEditToDeleteBetween(
            position.line,
            deleteText.startIndex,
            deleteText.endIndex
          ),
        ];
      }
      // 处理补全项
      postfixHandler.handleCompletionItem(postfix, postfix.datas.store);
      // 重置参数
      postfix.datas.clearData();
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
