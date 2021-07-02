import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "java", label: "souf" })
class SoufPostfixHandler4J extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LineTextHandleResult {
    const newText = `System.out.printf("$1",${replacement});`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
