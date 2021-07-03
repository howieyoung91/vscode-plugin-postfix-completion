import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler({ language: "cpp", label: "cin" })
export class CinPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Interval({ end: "." })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return `std::cin >> ${replacement};`;
  }
}
