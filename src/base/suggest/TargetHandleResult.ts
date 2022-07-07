/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

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
        start: number;
        end: number;
    };
}
