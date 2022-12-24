/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { CancellationToken, CompletionContext, Position, TextDocument } from "vscode";
import { AbstractRequest } from "../Request";

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
export default class PostfixSuggestionRequest extends AbstractRequest {
    getDocument = (): TextDocument => this._attributes[AttributeKeys.DOCUMENT_KEY];
    getPosition = (): Position => this._attributes[AttributeKeys.POSITION_KEY];
    getToken = (): CancellationToken => this._attributes[AttributeKeys.TOKEN_KEY];
    getCompletionContext = (): CompletionContext => this._attributes[AttributeKeys.CONTEXT_KEY];
    getLineText = (): string => this._attributes[AttributeKeys.LINE_TEXT_KEY];
    getLabel = (): string => this._attributes[AttributeKeys.LABEL_KEY];

    get target(): string {
        return this._target;
    }

    set target(target: string) {
        this._target = target;
    }
}
