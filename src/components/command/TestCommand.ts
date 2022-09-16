/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { LineTextPostfixCommandHandler } from "../../base/suggest/support/ExecutablePostfixHandler";
import { EnablePostfixCommand } from "../../base/decorator/Enable";

@EnablePostfixCommand({ label: "cmd", language: "java" })
class TestCommand extends LineTextPostfixCommandHandler {
    command(argv: string[]) {
        try {
            // const decoration = vscode.window.createTextEditorDecorationType({
                // backgroundColor: "red",
            // });
            // vscode.window.activeTextEditor.setDecorations(decoration, [new vscode.Range(0, 0, 0, 1)]);
        } catch (e) {
            console.log(e);
        }
    }
}
