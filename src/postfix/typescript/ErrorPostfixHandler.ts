import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
  { language: "javascript", label: "err" },
  { language: "typescript", label: "err" },
  { language: "vue", label: "err" },
  { language: "html", label: "err" },
  { language: "javascriptreact", label: "err" },
  { language: "typescriptreact", label: "err" }
)
class ErrorPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string) {
    return `console.error(${replacement});`;
  }
}
