import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "undefined" },
  { language: "typescript", label: "undefined" },
  { language: "vue", label: "undefined" },
  { language: "html", label: "undefined" }
)
class UndefinedPostfixHandler4TsJs extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(
      `if (${replacement} === undefined) {\n${indent()}$0\n}`
    );
  }
}
