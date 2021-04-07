import * as vsc from "vscode";

export default class DocumentUtil {
  private constructor() {}
  public static getIndentCharacters = () => {
    if (vsc.window.activeTextEditor?.options.insertSpaces) {
      return " ".repeat(vsc.window.activeTextEditor.options.tabSize as number);
    } else {
      return "\t";
    }
  };
}
