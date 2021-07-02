import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "python", label: "var" })
class VarPostfixHandler4Py extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LinetextHandleResult {
    const newText = `\${1:varName} = ${replacement}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
