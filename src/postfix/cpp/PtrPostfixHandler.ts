import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
@PostfixHandler(
  { language: "cpp", label: "ptr" },
  { language: "c", label: "ptr" }
)
class PtrPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Interval({ end: "." })
  handleLineText(replacement: string, datas: {}): LineTextHandleResult {
    const newText = `*${replacement}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
