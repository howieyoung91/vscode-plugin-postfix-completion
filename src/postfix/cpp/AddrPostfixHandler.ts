import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import {Target} from "../../base/decorator/Target";

@PostfixHandler(
  {language: "cpp", label: "addr"},
  {language: "c", label: "addr"}
)
class AddrPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Regex.Match({
    regex: /\s*[a-zA-Z_][a-zA-Z_0-9]*$/,
    start: " ",
  })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    datas["startIndex"]++;
    return `&${replacement.trim()}`;
  }
}
