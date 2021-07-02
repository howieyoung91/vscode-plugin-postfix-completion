import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "python", label: "return" },
  { language: "go", label: "return" }
)
class ReturnPostfixHandler extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LinetextHandleResult {
    return {
      text: new SnippetString(`return ${replacement}`),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
