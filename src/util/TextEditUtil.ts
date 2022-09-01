/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */
import { Position, Range, TextEdit, window } from "vscode";

export default class TextEditUtil {
    public static ADeleteTextEditBetween(lineNumber: number, start: number, end: number): TextEdit {
        return TextEdit.delete(new Range(new Position(lineNumber, start), new Position(lineNumber, end)));
    }

    public static deleteLine(lineNumber: number) {
        TextEditUtil.deleteRange(new Position(lineNumber, 0), new Position(lineNumber, 100));
    }

    public static deleteRange(startPosition: Position, endPosition: Position) {
        window.activeTextEditor.edit(editBuilder => {
            editBuilder.delete(new Range(startPosition, endPosition));
        })
    }
}
