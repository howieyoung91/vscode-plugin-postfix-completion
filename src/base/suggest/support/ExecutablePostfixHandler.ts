/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */
import { HandleResult, PostfixHandler, TargetHandleResult } from "../PostfixHandler";
import PostfixSuggestionRequest, { AttributeKeys } from "../PostfixSuggestionRequest";
import { Filter } from "../../decorator/Filter";

export abstract class ExecutablePostfixHandler<T> extends PostfixHandler {
    abstract resolveParams(result: HandleResult, request: PostfixSuggestionRequest): T;

    abstract command(params: T, request: PostfixSuggestionRequest): void;
}

export abstract class LineTextExecutablePostfixHandler extends ExecutablePostfixHandler<string[]> {
    @Filter.Slice()
    handleTarget(target: string, attributes: {}): HandleResult {
        const label = attributes[AttributeKeys.LABEL_KEY];
        return {
            text: target,
            documentation: label,
        };
    }

    resolveParams(result: HandleResult, request: PostfixSuggestionRequest): string[] {
        let paramString = (result as TargetHandleResult).text as string;
        return paramString.split(/\s+/);
    }

    abstract command(params: string[], request: PostfixSuggestionRequest): void;
}
