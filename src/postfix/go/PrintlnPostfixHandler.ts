import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "go", label: "println" })
class PrintlnPostfixHandler4Go extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText({})
  handleLineText(replacement: string) {
    return `fmt.Println(${replacement})`;
  }
}
