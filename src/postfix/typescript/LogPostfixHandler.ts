import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
  { language: "javascript", label: "log" },
  { language: "typescript", label: "log" },
  { language: "vue", label: "log" },
  { language: "html", label: "log" },
  { language: "javascriptreact", label: "log" },
  { language: "typescriptreact", label: "log" }
)
class LogPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    return `console.log(${replacement});`;
  }
}
