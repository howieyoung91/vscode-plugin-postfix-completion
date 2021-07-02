import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "javascript", label: "warn" },
  { language: "typescript", label: "warn" },
  { language: "vue", label: "warn" },
  { language: "html", label: "warn" }
)
class WarnPostfixHandler extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LineTextHandleResult | null {
    return {
      text: new SnippetString(`console.warn(${replacement});`),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
