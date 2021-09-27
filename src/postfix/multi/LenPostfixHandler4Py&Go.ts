import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler(
  { language: "python", label: "len" },
  { language: "go", label: "len" }
)
class LenPostfixHandler extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: any) {
    datas.startIndex++;
    return `len(${replacement.trim()})`;
  }
}
