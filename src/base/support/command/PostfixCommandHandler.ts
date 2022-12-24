/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */
import { HandleResult, PostfixHandler, TargetHandleResult } from "../PostfixHandler";
import { AttributeKeys } from "../suggest/PostfixSuggestionRequest";
import { Filter } from "../../decorator/Filter";
import { CommandRequest } from "./CommandRequest";
import { AbstractRequest } from "../Request";

export interface CommandHandler<T> {
    command(args: T, request: CommandRequest): void;
}

export abstract class PostfixCommandHandler<T> extends PostfixHandler implements CommandHandler<T> {
    abstract parse(result: HandleResult, request: AbstractRequest): T;

    abstract command(args: T, request: CommandRequest): void;
}

export abstract class LineTextPostfixCommandHandler extends PostfixCommandHandler<string[]> {
    @Filter.Slice()
    handleTarget(target: string, attributes: {}): HandleResult {
        const label = attributes[AttributeKeys.LABEL_KEY];
        return { text: target, documentation: label };
    }

    parse(result: HandleResult, request: AbstractRequest): string[] {
        const paramString = (result as TargetHandleResult).text as string;
        return paramString.split(/\s+/);
    }
}
