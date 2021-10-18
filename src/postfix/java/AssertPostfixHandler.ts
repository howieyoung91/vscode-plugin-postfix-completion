import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "java", label: "assert" })
class AssertPostfixHandler4J extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    return `assert ${replacement};`;
  }
}
