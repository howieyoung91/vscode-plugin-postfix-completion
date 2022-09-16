/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */
import { HandleResult, PostfixHandler, TargetHandleResult } from "../PostfixHandler";
import PostfixSuggestionRequest, { AttributeKeys } from "../PostfixSuggestionRequest";
import { Filter } from "../../decorator/Filter";

export abstract class PostfixCommandHandler<T> extends PostfixHandler {
    abstract parse(result: HandleResult, request: PostfixSuggestionRequest): T;

    abstract command(args: T, request: PostfixSuggestionRequest): void;
}

export abstract class LineTextPostfixCommandHandler extends PostfixCommandHandler<string[]> {
    @Filter.Slice()
    handleTarget(target: string, attributes: {}): HandleResult {
        const label = attributes[AttributeKeys.LABEL_KEY];
        return {
            text: target,
            documentation: label,
        };
    }

    parse(result: HandleResult, request: PostfixSuggestionRequest): string[] {
        let paramString = (result as TargetHandleResult).text as string;
        return paramString.split(/\s+/);
    }

    abstract command(args: string[], request: PostfixSuggestionRequest): void;
}
