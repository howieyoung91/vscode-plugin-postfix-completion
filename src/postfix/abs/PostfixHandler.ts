import { CompletionItem, SnippetString } from "vscode";

/**
 * 后缀处理类
 * @description 该类关注后缀的处理逻辑
 *
 */
export default abstract class PostfixHandler {
  protected args: any = {};

  /**
   * 添加参数
   */
  public setArg(key: string, value: any): PostfixHandler {
    this.args[key] = value;
    return this;
  }

  /**
   * 获取参数
   */
  public getArg(key: string): any {
    return this.args[key];
  }
  
  /**
   * 清理参数
   */
  public clearArg(): PostfixHandler {
    this.args = {};
    return this;
  }
  /**
   * 初始化参数
   */
  initArgs() {}

  /**
   * 处理行文本
   * @param lineText
   */
  abstract handleLineText(
    lineText: string
  ):
    | string
    | SnippetString
    | { text: string | SnippetString; documentation?: string; detail?: string }
    | null;

  /**
   * 处理补全项
   */
  handleCompleteItem(item: CompletionItem) {}
}
