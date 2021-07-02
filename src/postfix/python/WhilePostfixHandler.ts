import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "python", label: "while" })
class WhilePostfixHandler4Py extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LinetextHandleResult {
    return {
      text: new SnippetString(`while ${replacement}:\n${indent()}`),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
