/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { CancellationToken, CompletionContext, Position } from "vscode";
export enum AttributeKeys {
    DOCUMENT_KEY = "document",
    POSITION_KEY = "position",
    TOKEN_KEY = "token",
    CONTEXT_KEY = "context",
    FIRST_NOT_WHITESPACE_KEY = "firstNotWhiteSpaceIndex",
    LINE_TEXT_KEY = "lineText",
    LABEL_KEY = "label",
}
/**
 * 后缀补全建议请求
 */
export default class PostfixSuggestionRequest {
    protected _attributes: any = {};
    protected _target: string;

    public setAttributes(attributes: {}): this {
        this._attributes = Object.assign(attributes, this._attributes);
        return this;
    }

    public setAttribute(key: string, value: any) {
        this._attributes[key] = value;
        return this;
    }

    public clearAttributes() {
        this._attributes = {};
    }

    public getAttribute = (key: string) => this._attributes[key];
    public getDocument = (): string => this._attributes[AttributeKeys.DOCUMENT_KEY];
    public getPosition = (): Position => this._attributes[AttributeKeys.POSITION_KEY];
    public getToken = (): CancellationToken => this._attributes[AttributeKeys.TOKEN_KEY];
    public getCompletionContext = (): CompletionContext => this._attributes[AttributeKeys.CONTEXT_KEY];
    public getLineText = (): CompletionContext => this._attributes[AttributeKeys.LINE_TEXT_KEY];
    public getLabel = (): string => this._attributes[AttributeKeys.LABEL_KEY];

    get attributes(): any {
        return this._attributes;
    }

    get target(): string {
        return this._target;
    }

    set target(target: string) {
        this._target = target;
    }
}
