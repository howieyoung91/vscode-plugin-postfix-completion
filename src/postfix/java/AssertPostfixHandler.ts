import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "java", label: "assert" })
class AssertPostfixHandler4J extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return `assert ${replacement};`;
  }
}
