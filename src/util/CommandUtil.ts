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
