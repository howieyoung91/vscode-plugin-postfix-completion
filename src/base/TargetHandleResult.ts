import { SnippetString } from "vscode";

/**
 * 目标文本处理结果
 */
export default interface TargetHandleResult {
    text: string | SnippetString;
    documentation?: string;
    detail?: string;
    data?: {};
    deleteText?: {
        startIndex: number;
        endIndex: number;
    };
}
