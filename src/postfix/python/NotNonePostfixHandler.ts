import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "python", label: "notnone" })
class NotNonePostfixHandler4Py extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return `if ${replacement} is not None:\n${indent()}`;
  }
}
