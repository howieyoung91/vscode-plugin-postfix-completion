import {commands} from "vscode";

export default class CommandUtil {
  private constructor() {
  }

  static formatDocument() {
    commands.executeCommand("editor.action.formatDocument");
  }
}
