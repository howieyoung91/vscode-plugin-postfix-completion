import { removeAllListeners } from "node:process";
import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "java", label: "while" },
  { language: "c", label: "while" },
  { language: "cpp", label: "while" },
  { language: "javascript", label: "while" },
  { language: "typescript", label: "while" },
  { language: "vue", label: "while" },
  { language: "html", label: "while" }
)
class WhilePostfixHandler extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LineTextHandleResult {
    return {
      text: new SnippetString(`while (${replacement}) {\n${indent()}$1\n}`),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
