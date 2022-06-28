import { Position, Range, TextEdit } from "vscode";

export default class TextEditUtil {
    private TextEditUtil() {
    }

    public static ATextEditToDeleteBetween(lineNumber: number, start: number, end: number): TextEdit {
        return TextEdit.delete(new Range(new Position(lineNumber, start), new Position(lineNumber, end)));
    }
}
