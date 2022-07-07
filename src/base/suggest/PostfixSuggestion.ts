/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixHandler from "./PostfixHandler";
import { CompletionItem, CompletionItemKind } from "vscode";
import PostfixSuggestionRequest from "./PostfixSuggestionRequest";

/**
 * 后缀补全基类
 */
export default class PostfixSuggestion extends CompletionItem {
    protected _handler: PostfixHandler;
    protected _request: PostfixSuggestionRequest = new PostfixSuggestionRequest(); // FIXME 这里复用了一个请求 有可能会出现问题

    constructor(label: string, handler: PostfixHandler) {
        super(label, CompletionItemKind.Snippet);
        this._handler = handler;
    }

    public static of(label: string, handler: PostfixHandler) {
        return new PostfixSuggestion(label, handler);
    }

    get handler(): PostfixHandler {
        return this._handler;
    }

    get request(): PostfixSuggestionRequest {
        return this._request;
    }

    set request(value: PostfixSuggestionRequest) {
        this._request = value;
    }
}
