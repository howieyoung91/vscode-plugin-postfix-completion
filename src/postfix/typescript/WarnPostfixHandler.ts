import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler(
  { language: "javascript", label: "warn" },
  { language: "typescript", label: "warn" },
  { language: "vue", label: "warn" },
  { language: "html", label: "warn" }
)
class WarnPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return `console.warn(${replacement});`;
  }
}
