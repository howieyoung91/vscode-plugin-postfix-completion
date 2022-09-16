/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { PostfixHandler } from "./PostfixHandler";
import { CompletionItem, CompletionItemKind } from "vscode";
import PostfixSuggestionRequest from "./PostfixSuggestionRequest";

/**
 * 后缀补全基类
 */
export default class PostfixSuggestion extends CompletionItem {
    protected _handler: PostfixHandler;

    constructor(label: string, handler: PostfixHandler) {
        super(label, CompletionItemKind.Snippet);
        this._handler = handler;
    }

    invoke(request: PostfixSuggestionRequest) {
        const target = request.getLineText();
        let result = this._handler.handle(request) ?? this._handler.handleTarget(target, request.attributes);
        if (this.shouldClearAttributes()) {
            request.clearAttributes();
        }
        return result;
    }

    protected shouldClearAttributes() {
        return true;
    }

    public static of(label: string, handler: PostfixHandler) {
        return new PostfixSuggestion(label, handler);
    }
}
