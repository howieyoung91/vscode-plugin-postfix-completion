/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { commands } from "vscode";

export default class CommandUtil {
    private constructor() {}

    static execute(command: string) {
        commands.executeCommand(command);
    }

    static formatDocument() {
        commands.executeCommand("editor.action.formatDocument");
    }
}
