import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "java", label: "assert" })
class AssertPostfixHandler4J extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LineTextHandleResult {
    const newText = `assert ${replacement};`;
    return {
      text: newText,
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
