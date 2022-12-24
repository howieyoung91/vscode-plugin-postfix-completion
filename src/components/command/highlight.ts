/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { DecorationRangeBehavior, window } from "vscode";
import { EnablePostfixCommand } from "../../base/decorator/Enable";
import { DELETE_WORD_ENHANCE } from "../../base/support/command/CommandEnhancer";
import { LineTextPostfixCommandHandler } from "../../base/support/command/PostfixCommandHandler";

@EnablePostfixCommand({ label: "highlight", language: "plaintext", enhancers: [DELETE_WORD_ENHANCE] })
class Mark extends LineTextPostfixCommandHandler {
    command(args: string[]) {
        const editor = window.activeTextEditor;
        const currentLineNumber = editor.selection.start.line;
        const range = editor.document.lineAt(currentLineNumber).range;
        const decoration = window.createTextEditorDecorationType({
            color: "#fff",
            backgroundColor: "#ffbd2a",
            overviewRulerColor: "rgba(255,189,42,0.8)",
            rangeBehavior: DecorationRangeBehavior.ClosedClosed,
            isWholeLine: true,
        });

        editor.setDecorations(decoration, [range]);
    }
}
