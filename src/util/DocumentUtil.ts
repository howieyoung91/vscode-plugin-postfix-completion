import {Position, TextDocument, TextLine} from "vscode";

export default class DocumentUtil {
  private constructor() {
  }

  public static getLineFromDocumentAndPosition(document: TextDocument, position: Position): TextLine {
    return document.lineAt(position);
  }
}