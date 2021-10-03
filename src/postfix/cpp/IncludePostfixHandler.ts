import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler(
  { language: "cpp", label: "include" },
  { language: "c", label: "include" }
)
class IncludePostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.DeleteText()
  handleLineText(replacement: string, datas: any) {
    datas.startIndex++;
    return `#include "${replacement.trim()}"`;
  }
}
