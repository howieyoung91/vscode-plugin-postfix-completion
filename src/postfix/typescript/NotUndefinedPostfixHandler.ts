import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "notundefined" },
  { language: "typescript", label: "notundefined" },
  { language: "vue", label: "notundefined" },
  { language: "html", label: "notundefined" }
)
class NotUndefinedPostfixHandler4TsJs extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(
      `if (${replacement} !== undefine) {\n${indent()}$1\n}`
    );
  }
}
