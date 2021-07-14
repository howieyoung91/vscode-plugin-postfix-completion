import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";

@PostfixHandler(
  { language: "cpp", label: "ptr" },
  { language: "c", label: "ptr" }
)
class PtrPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return `*${replacement}`;
  }
}
