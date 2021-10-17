import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "notnull" },
  { language: "typescript", label: "notnull" },
  { language: "vue", label: "notnull" },
  { language: "html", label: "notnull" }
)
class NotNullPostfixHandler4TsJs extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string) {
    return new SnippetString(
      `if (${replacement} !== null) {\n${indent()}$0\n}`
    );
  }
}
