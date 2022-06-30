import * as vsc from "vscode";
import { Position, TextDocument, TextLine } from "vscode";

export default class DocumentUtil {
    /**
     * 获取当前的缩进
     */
    public static indentCharacters = () => {
        if (vsc.window.activeTextEditor?.options.insertSpaces) {
            return " ".repeat(vsc.window.activeTextEditor.options.tabSize as number);
        } else {
            return "\t";
        }
    };

    public static getLineText(document: TextDocument, position: Position) {
        const line: TextLine = document.lineAt(position);
        let lineText: string = line.text.substring(0, position.character);
        return { line, lineText };
    }

    public static getTextLine(document: TextDocument, position: Position) {
        return document.lineAt(position);
    }
}

const indent = DocumentUtil.indentCharacters;
export { indent };
