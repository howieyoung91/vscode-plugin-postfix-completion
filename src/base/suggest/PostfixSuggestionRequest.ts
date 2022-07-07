/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { CancellationToken, CompletionContext, Position } from "vscode";

/**
 * 后缀补全建议请求
 */
export default class PostfixSuggestionRequest {
    public static readonly DOCUMENT_KEY = "document";
    public static readonly POSITION_KEY = "position";
    public static readonly TOKEN_KEY = "token";
    public static readonly CONTEXT_KEY = "context";

    protected _attributes: any = {};
    protected _userData: any = {};

    get attributes(): any {
        return this._attributes;
    }

    public setAttributes(attributes: {}): this {
        this._attributes = Object.assign(attributes, this._attributes);
        return this;
    }

    public setAttribute(key: string, value: any) {
        this._attributes[key] = value;
        return this;
    }

    public setData(key: string, value: any) {
        this._userData[key] = value;
        return this;
    }

    public getData = (key: string) => this._userData[key];
    public getAttribute = (key: string) => this._attributes[key];
    public getDocument = (): string => this._attributes[PostfixSuggestionRequest.DOCUMENT_KEY];
    public getPosition = (): Position => this._attributes[PostfixSuggestionRequest.POSITION_KEY];
    public getToken = (): CancellationToken => this._attributes[PostfixSuggestionRequest.TOKEN_KEY];
    public getCompletionContext = (): CompletionContext => this._attributes[PostfixSuggestionRequest.CONTEXT_KEY];

    public clearAttributes() {
        this._attributes = {};
    }
}
