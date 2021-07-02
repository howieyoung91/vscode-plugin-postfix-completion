import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "java", label: "return" },
  { language: "c", label: "return" },
  { language: "cpp", label: "return" },
  { language: "javascript", label: "return" },
  { language: "typescript", label: "return" },
  { language: "vue", label: "return" },
  { language: "html", label: "return" }
)
class ReturnPostfixHandler extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LineTextHandleResult {
    return {
      text: new SnippetString(`return ${replacement};`),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
