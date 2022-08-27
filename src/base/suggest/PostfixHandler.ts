/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import TargetHandleResult from "./TargetHandleResult";
import PostfixSuggestionRequest from "./PostfixSuggestionRequest";

export type HandleResult = string | SnippetString | TargetHandleResult;

/**
 * 后缀处理类
 * @description 该类关注后缀的处理逻辑, PostfixProvider 会按以下顺序依次调用方法,
 * initArgs()->handleLineText()->handleCompletionItem()
 * 这几个方法中都带有 args 参数,这个参数会被 Postfix 传入,代表了当前 Postfix 中的参数
 */
export abstract class PostfixHandler {
    handle(request: PostfixSuggestionRequest): HandleResult {
        return null;
    }

    /**
     * 处理目标文本
     * @param target 行文本
     * @param attributes
     */
    handleTarget(target: string, attributes: {}): HandleResult {
        return null;
    }

    // /**
    //  * 处理补全项
    //  * @param item 补全项
    //  * @param data 参数
    //  */
    // handleCompletionItem(item: CompletionItem, data: {}) {}

    // handlePostfixSuggestionFinally(suggestion: PostfixSuggestion, request: PostfixSuggestionRequest) {}
}
