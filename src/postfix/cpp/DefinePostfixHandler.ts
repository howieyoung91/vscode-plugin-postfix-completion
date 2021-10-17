import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler(
  { language: "cpp", label: "define" },
  { language: "c", label: "define" }
)
class DefinePostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.Replace()
  handleLineText(replacement: string, datas) {
    datas.startIndex++;
    return `#define ${replacement.trim()} `;
  }
}
