import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler({ language: "python", label: "not" })
class NotPostfixHandler4Py extends BasePostfixHandler {
  @Target.Interval({ start: " " })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: any) {
    datas.startIndex++;
    return `not ${replacement.trim()}`;
  }
}
