import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "notundefined" },
  { language: "typescript", label: "notundefined" },
  { language: "vue", label: "notundefined" },
  { language: "html", label: "notundefined" },
  { language: "javascriptreact", label: "notundefined" },
  { language: "typescriptreact", label: "notundefined" }
)
class NotUndefinedPostfixHandler4TsJs extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string, data: {}) {
    return new SnippetString(
      `if (${replacement} !== undefine) {\n${indent()}$0\n}`
    );
  }
}
