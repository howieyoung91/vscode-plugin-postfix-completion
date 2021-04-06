import * as vsc from "vscode";
import { Position } from "vscode";
import JavaPostfix from "./JavaPostfix";
import Register from "../../util/Register";

class SoutPostfix4Java extends JavaPostfix {
  constructor() {
    super("sout", ".");
  }

  handleLineText(lineText: string): string | vsc.SnippetString | null {
    //   TODO 
    /*
       ① somthing.sout -> System.out.println(somthing);
       ② new somthing.sout -> System.out.println(new somthing);
       ③ (somthing).sout -> System.out.println(somthing);
    */
    let startIndex = 0;
    startIndex = lineText.search(/[\s;\[\]\{\}]\(.*?\).[s]*[o]*[u]*[t]*$/);
    if (startIndex !== -1) {
      let replacement = lineText.substring(
        startIndex,
        lineText.lastIndexOf(")")
      );
      let replacementStartIndex = replacement.indexOf("(") + 1;
      replacement = replacement.substring(replacementStartIndex);
      this.args.startIndex = startIndex + replacementStartIndex - 1;
      return `System.out.println(${replacement});`;
    }
    startIndex = lineText.search(
      /[\s;\[\]\(\)\{\}]new\s+(.*?)\(.*?\).[s]*[o]*[u]*[t]*$/
    );
    if (startIndex !== -1) {
      let replacement = lineText.substring(
        startIndex + 1,
        lineText.lastIndexOf(".")
      );
      let replacementStartIndex = replacement.indexOf("new");
      replacement = replacement.substring(replacementStartIndex);
      this.args.startIndex = startIndex + replacementStartIndex;
      return `System.out.println(${replacement});`;
    }
    startIndex = lineText.search(/[\s;\[\]\(\)\{\}](.*?).[s]*[o]*[u]*[t]*$/);
    if (startIndex !== -1) {
      let replacement = lineText.substring(
        startIndex,
        lineText.lastIndexOf(".")
      );
      replacement = replacement.substring(replacement.indexOf("new"));
      this.args.startIndex = startIndex;
      return `System.out.println(${replacement});`;
    }
    return null;
  }

  handleCompleteItem(item: vsc.CompletionItem) {
    let position: vsc.Position = this.args.position;
    // 删除原来的文本
    item.additionalTextEdits = [
      vsc.TextEdit.delete(
        new vsc.Range(
          new Position(position.line, this.args.startIndex),
          position
        )
      ),
    ];
  }
}

Register.registerPostfix(new SoutPostfix4Java());
