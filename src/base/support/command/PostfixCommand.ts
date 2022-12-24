/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { commands, Command } from "vscode";
import { Assert } from "../../../util/Assert";
import { HandleResult } from "../PostfixHandler";
import PostfixSuggestion from "../PostfixSuggestion";
import PostfixSuggestionRequest from "../suggest/PostfixSuggestionRequest";
import { PostfixCommandEnhancer } from "./CommandEnhancer";
import { CommandRequest } from "./CommandRequest";
import { PostfixCommandHandler } from "./PostfixCommandHandler";

export class PostfixCommand extends PostfixSuggestion {
    private readonly id: string;
    private result: HandleResult;
    private request: CommandRequest;
    private enhancers: PostfixCommandEnhancer[] = [];

    constructor(id: string, label: string, handler: PostfixCommandHandler<any>) {
        super(label, handler);
        this.id = id;
        this.activateInvoker();
    }

    public addEnhancers(enhancers: PostfixCommandEnhancer[]) {
        enhancers.forEach(enhance => this.enhancers.push(enhance));
    }

    invoke(rawRequest: PostfixSuggestionRequest): HandleResult {
        this.request = new CommandRequestAdapter(rawRequest);
        this.result = super.invoke(rawRequest);
        if (Assert.isString(this.result) || Assert.isSnippetString(this.result)) {
            return "";
        } else {
            const result = { ...this.result };
            result.text = "";
            result.detail = result.detail ?? "Postfix Command";
            return result;
        }
    }
    
    private invokeCommand(handler: PostfixCommandHandler<any>) {
        if (this.shouldCommand()) {
            this.applyEnhancerBeforeCommand();
            const args = handler.parse(this.result, this.request);
            handler.command(args, this.request); //! execute command
            this.applyEnhancerAfterCommand();
        }
    }

    protected shouldCommand() {
        return this.request;
    }

    private activateInvoker() {
        const callbackCommand: Command = { title: "", command: this.id + "_invoker" };
        // 把回调函数注册进入 vscode
        commands.registerCommand(callbackCommand.command, (...args: any[]) =>
            this.invokeCommand(this._handler as PostfixCommandHandler<any>)
        );
        this.command = callbackCommand;
    }

    private applyEnhancerBeforeCommand() {
        for (const enhancer of this.enhancers) {
            enhancer.beforeCommand(this, this.request);
        }
    }

    private applyEnhancerAfterCommand() {
        for (const enhancer of this.enhancers) {
            enhancer.afterCommand(this, this.request);
        }
    }

    protected shouldClearAttributes(): boolean {
        return false;
    }
}

export class CommandRequestAdapter extends CommandRequest {
    private readonly _raw: PostfixSuggestionRequest;

    constructor(raw: PostfixSuggestionRequest) {
        super();
        this._raw = raw;
    }

    get raw() {
        return this._raw;
    }
}
