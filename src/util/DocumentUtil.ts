import * as vsc from "vscode";

class DocumentUtil {
  private constructor() {}

  public static indentCharacters = () => {
    if (vsc.window.activeTextEditor?.options.insertSpaces) {
      return " ".repeat(vsc.window.activeTextEditor.options.tabSize as number);
    } else {
      return "\t";
    }
  };
}

const indent = DocumentUtil.indentCharacters;
export { indent };
