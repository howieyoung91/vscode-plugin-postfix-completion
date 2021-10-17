import { SnippetString } from "vscode";
/**
 * 行文本处理结果
 */
export default interface TargetHandleResult {
  text: string | SnippetString;
  documentation?: string;
  detail?: string;
  datas?: {};
  deleteText?: {
    startIndex: number;
    endIndex: number;
  };
}
