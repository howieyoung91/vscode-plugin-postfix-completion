import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler(
  { language: "javascript", label: "err" },
  { language: "typescript", label: "err" },
  { language: "vue", label: "err" },
  { language: "html", label: "err" }
)
class ErrorPostfixHandler extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return `console.error(${replacement});`;
  }
}
