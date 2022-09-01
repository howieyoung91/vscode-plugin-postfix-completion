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
    protected _request: PostfixSuggestionRequest = new PostfixSuggestionRequest(); // !这里复用了一个请求 有可能会出现问题

    constructor(label: string, handler: PostfixHandler) {
        super(label, CompletionItemKind.Snippet);
        this._handler = handler;
    }

    /**
     * 触发补全建议
     */
    invoke(lineText: string) {
        this._request.target = lineText;
        let result = this._handler.handle(this._request);
        if (result === null) {
            result = this._handler.handleTarget(lineText, this._request.attributes);
        }
        if (this.shouldClearAttributes()) {
            this.clearAttributes();
        }
        return result;
    }

    protected shouldClearAttributes() {
        return true;
    }

    setAttributes = (attributes: {}) => this._request.setAttributes(attributes);
    setAttribute = (key: string, value: any) => this._request.setAttribute(key, value);
    getAttribute = (key: string) => this._request.getAttribute(key);
    clearAttributes = () => this._request.clearAttributes();

    public static of(label: string, handler: PostfixHandler) {
        return new PostfixSuggestion(label, handler);
    }
}
