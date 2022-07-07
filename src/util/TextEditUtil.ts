/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { Position, Range, TextEdit } from "vscode";

export default class TextEditUtil {
    public static ATextEditToDeleteBetween(lineNumber: number, start: number, end: number): TextEdit {
        return TextEdit.delete(new Range(new Position(lineNumber, start), new Position(lineNumber, end)));
    }
}
