import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "go", label: "printf" })
class PrintfPostfixHandler4Go extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText()
  handleLineText(replacement: string, datas: {}) {
    return `fmt.Printf("%+v\\n",${replacement})`;
  }
}
