/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixSuggestion from "../PostfixSuggestion";
import { Command, commands } from "vscode";
import { PostfixCommandHandler } from "./ExecutablePostfixHandler";
import TextEditUtil from "../../../util/TextEditUtil";
import { HandleResult } from "../PostfixHandler";
import { Assert } from "../../../util/Assert";
import PostfixSuggestionRequest from "../PostfixSuggestionRequest";

// export interface PostfixCommandConfiguration {
// detail?: string;
// }

export class PostfixCommand extends PostfixSuggestion {
    private readonly id: string;
    private result: HandleResult;
    private request: PostfixSuggestionRequest;

    constructor(id: string, label: string, handler: PostfixCommandHandler<any>) {
        super(label, handler);
        this.id = id;

        this.activateInvoker();

        // register command
        commands.registerCommand(id, () => {
            if (this.request) {
                this.deleteLine();
                const args = handler.parse(this.result, this.request);
                handler.command(args, this.request); //! execute command
            }
        });
    }

    invoke(request: PostfixSuggestionRequest): HandleResult {
        this.request = request;
        this.result = super.invoke(request);
        if (!Assert.isString(this.result) && !Assert.isSnippetString(this.result)) {
            const result = { ...this.result };
            result.text = "";
            result.detail = result.detail ?? "Postfix Command";
            return result;
        } else {
            return "";
        }
    }

    private activateInvoker() {
        const callbackCommand: Command = { title: "", command: this.id + "_invoker" };
        // 把回调函数注册进入 vscode
        commands.registerCommand(callbackCommand.command, (...args: any[]) => {
            commands.executeCommand(this.id, args);
        });
        this.command = callbackCommand;
    }

    private deleteLine() {
        const position = this.request.getPosition();
        TextEditUtil.deleteLine(position.line);
    }

    protected shouldClearAttributes(): boolean {
        return false;
    }
}
