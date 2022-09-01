/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { LineTextExecutablePostfixHandler } from "../../base/suggest/support/ExecutablePostfixHandler";
import { EnablePostfixCommand } from "../../base/decorator/Enable";
import * as vscode from "vscode";

// @EnablePostfixCommand({ label: "cmd", language: "java" })
class TestCommand extends LineTextExecutablePostfixHandler {
    command(argv: string[]) {
        try {
            vscode.commands.executeCommand("workbench.action.terminal.sendSequence", argv);
        } catch (e) {
            console.log(e);
        }
    }
}

// @EnablePostfixCommand({ label: "cmd1", language: "java" })
class Test1Command extends LineTextExecutablePostfixHandler {
    command(argv: string[]) {
        vscode.window.showInformationMessage("cmd1\t" + argv.toString());
    }
}
