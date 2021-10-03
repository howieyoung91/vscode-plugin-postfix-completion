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
import Registry from "../util/Registry";
import TextEditUtil from "../util/TextEditUtil";
import BasePostfix from "./BasePostfix";
import LineTextHandleResult from "./LineTextHandleResult";
import BasePostfixHandler from "./BasePostfixHandler";

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
    Registry.registerPostfixProvider(this);
    return this;
  }

  /**
   * 提供补全项
   * TODO 这个方法可以解耦
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
      postfix.datas.addData({
        document,
        position,
        token,
        context,
      });
      // 初始化参数
      postfixHandler.initArgs(postfix.datas.store);
      let { line, lineText } = this.getLineText(document, position);

      let result = this.handleLineText(postfix, line, postfixHandler, lineText);

      // 如果返回 null 则直接返回,不添加 item
      if (result === null) {
        continue;
      }
      let resultObject: {
        text;
        documentation;
        detail;
        addition;
        deleteText;
      } = this.parseResult(result, postfix);
      // let {text, documentation, detail, addition, deleteText} = this.parseResult(result, postfix);
      // 设置新的文本
      this.applyPropertValue(resultObject, postfix, position);
      // 处理补全项
      postfixHandler.handleCompletionItem(postfix, postfix.datas.store);
      // 重置参数
      postfix.datas.clearData();
      // 添加补全项
      completionItems.push(postfix);
      // console.log(postfix);
    }
    return completionItems;
  }

  private applyPropertValue(
    resultObject: { text; documentation; detail; addition; deleteText },
    postfix: BasePostfix,
    position: Position
  ) {
    if (resultObject.text) {
      postfix.insertText = resultObject.text;
    }
    // 设置新的详情
    if (resultObject.detail) {
      postfix.detail = resultObject.detail;
    } else {
      // 默认为 postfix
      postfix.detail = `postfix`;
    }
    // 设置新的文档
    if (resultObject.documentation) {
      postfix.documentation = resultObject.documentation;
    } else {
      if (resultObject.text instanceof SnippetString) {
        // 如果是Snippet
        postfix.documentation = resultObject.text.value;
      } else {
        // 如果是string
        postfix.documentation = resultObject.text;
      }
    }
    // 添加参数
    // if (resultObject.addition) {
    //   postfix.datas.addData(resultObject.addition);
    // }
    // 是否删除原有文本
    if (resultObject.deleteText) {
      postfix.additionalTextEdits = [
        TextEditUtil.ATextEditToDeleteBetween(
          position.line,
          resultObject.deleteText.startIndex,
          resultObject.deleteText.endIndex
        ),
      ];
    }
  }

  private parseResult(
    result: string | SnippetString | LineTextHandleResult,
    postfix: BasePostfix
  ) {
    let text: string | SnippetString | undefined = undefined;
    let documentation: string | undefined = undefined;
    let detail: string | undefined = undefined;
    let addition: object | undefined = undefined;
    let deleteText: { startIndex; endIndex } | undefined = undefined;

    switch (typeof result) {
      case "object":
        if (result instanceof SnippetString) {
          text = result;
        } else {
          text = result.text;
          documentation = result.documentation;
          detail = result.detail;
          // postfix.datas.setData(addition);
          // datas = result.datas;
          deleteText = result.deleteText;
        }
        break;
      case "string":
        text = result;
        break;
    }
    return { text, documentation, detail, addition, deleteText };
  }

  private handleLineText(
    postfix: BasePostfix,
    line: TextLine,
    postfixHandler: BasePostfixHandler,
    lineText: string
  ) {
    // 把 firstNotWhiteSpaceIndex 放入 datas
    postfix.datas.addData({
      firstNotWhiteSpaceIndex: line.firstNonWhitespaceCharacterIndex,
    });
    // postfixHandler 处理行文本
    let result = postfixHandler.handleLineText(lineText, postfix.datas.store);
    return result;
  }

  private getLineText(document: TextDocument, position: Position) {
    // 获取行文本
    const line: TextLine = document.lineAt(position);
    let lineText: string = line.text.substring(0, position.character);
    return { line, lineText };
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
