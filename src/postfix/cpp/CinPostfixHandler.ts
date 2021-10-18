import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler({ language: "cpp", label: "cin" })
export class CinPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Slice({ end: "." })
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    return `std::cin >> ${replacement};`;
  }
}
