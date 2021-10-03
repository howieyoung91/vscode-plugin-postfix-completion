import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler(
  { language: "python", label: "return" },
  { language: "go", label: "return" }
)
class ReturnPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText()
  handleLineText(replacement: string) {
    return `return ${replacement}`;
  }
}
