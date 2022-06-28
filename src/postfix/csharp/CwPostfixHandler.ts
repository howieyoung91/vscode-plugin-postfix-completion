import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { Target } from "../../base/decorator/Target";

@PostfixHandler({ language: "csharp", label: "cw" })
class CwPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  handleLineText(replacement: string, data: {}) {
    let res = {
      text: null,
      deleteText: null,
    };
    // 判断是否为空
    if (replacement.length === 0) {
      res.text = new SnippetString(`Console.WriteLine($1);`);
    } else {
      res.text = new SnippetString(`Console.WriteLine(${replacement});`);
      res.deleteText = {
        startIndex: data["startIndex"],
        endIndex: data["endIndex"] + 1,
      };
    }
    return res;
  }
}
