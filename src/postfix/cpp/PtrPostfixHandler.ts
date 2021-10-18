import BasePostfixHandler from "../../base/BasePostfixHandler";
import {PostfixHandler} from "../../base/decorator/PostfixHandler";
import {Return} from "../../base/decorator/Return";
import {Target} from "../../base/decorator/Target";

@PostfixHandler(
  {language: "cpp", label: "ptr"},
  {language: "c", label: "ptr"}
)
class PtrPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Regex.Match({
    regex: /\s*[a-zA-Z_][a-zA-Z_0-9]*$/,
    start: " ",
    end: ".",
  })
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    datas["startIndex"]++;
    return `*${replacement.trim()}`;
  }
}
