/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixSuggestion from "../PostfixSuggestion";
import { Command, commands } from "vscode";
import { ExecutablePostfixHandler } from "./ExecutablePostfixHandler";
import TextEditUtil from "../../../util/TextEditUtil";
import { HandleResult } from "../PostfixHandler";
import { Assert } from "../../../util/Assert";

export default class PostfixCommand extends PostfixSuggestion {
    private readonly delegate: string;
    private result: HandleResult;

    constructor(label: string, delegate: string, handler: ExecutablePostfixHandler<any>) {
        super(label, handler);
        this.delegate = delegate;

        this.activateInvoker();

        // register command
        commands.registerCommand(delegate, (...args) => {
            this.deleteLine();
            const params = handler.resolveParams(this.result, this._request);
            handler.command(params, this._request); //! execute command
            this.clearAttributes();
        });
    }

    invoke(lineText: string): HandleResult {
        this.result = super.invoke(lineText);
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
        const callbackCommand: Command = {
            title: "",
            command: this.delegate + "_invoker",
        };
        // 把回调函数注册进入 vscode
        commands.registerCommand(callbackCommand.command, (...args: any[]) => {
            commands.executeCommand(this.delegate, args);
        });
        this.command = callbackCommand;
    }

    private deleteLine() {
        const position = this._request.getPosition();
        TextEditUtil.deleteLine(position.line);
    }

    protected shouldClearAttributes(): boolean {
        return false;
    }
}
