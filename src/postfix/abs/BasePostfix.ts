import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionList,
  Position,
  ProviderResult,
  TextDocument,
  TextLine,
  SnippetString,
  CompletionItemKind,
} from "vscode";
import CodeTipComplete from "../../abs/CodeTipComplete";
/**
 * 后缀补全基类
 */
export default abstract class BasePostfix extends CodeTipComplete {
  protected args: any = {};
  /**
   * 初始化参数
   */
  initArgs() {}

  /**
   * 处理行文本
   * @param lineText 行文本
   * @param args 参数传递
   * @returns string或者是SnippetString
   */
  abstract handleLineText(lineText: string): string | SnippetString | null;
  /**
   * 处理补全项,默认空实现
   * @param item 补全项
   */
  handleCompleteItem(item: CompletionItem): any {}
  /**
   *
   * 提供补全项,这是一个模板方法,不要重写该方法
   * 其他Postfix继承该类,重写hanle方法即可
   *
   * @param document 文档
   * @param position 当前光标的位置
   * @param token token
   * @param context 上下文
   * @returns 补全项列表
   */
  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList> {
    this.args.document = document;
    this.args.position = position;
    this.args.token = token;
    this.args.context = context;
    // 初始化参数
    this.initArgs();
    // 获取行文本
    const line: TextLine = document.lineAt(position);
    let lineText: string = line.text.substring(0, position.character);

    // 处理行文本 并获取结果,这个会作为新的字符串添加到自动补全的item中
    let snippet = this.handleLineText(lineText);
    // 如果返回null 则直接返回,不添加item
    if (snippet === null) {
      return null;
    }
    // 新增补全项
    let completionItem = new CompletionItem(
      this._labelName,
      CompletionItemKind.Snippet
    );
    // 设置新的文本
    completionItem.insertText = snippet;

    // 处理补全项
    this.handleCompleteItem(completionItem);
    // 重置参数
    this.args = {};
    // 返回补全项
    return [completionItem];
  }

  resolveCompletionItem(
    item: CompletionItem,
    token: CancellationToken
  ): ProviderResult<CompletionItem> {
    return null;
  }
}
