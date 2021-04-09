import { SnippetString } from "vscode";
/**
 * 行文本处理结果
 */
export default interface LineTextHandleResult {
  text: string | SnippetString;
  documentation?: string;
  detail?: string;
  datas?: {};
}
