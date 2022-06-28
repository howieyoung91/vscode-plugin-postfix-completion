import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "null" },
  { language: "typescript", label: "null" },
  { language: "vue", label: "null" },
  { language: "html", label: "null" },
  { language: "javascriptreact", label: "null" },
  { language: "typescriptreact", label: "null" }
)
class NullPostfixHandler4TsJs extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string) {
    return new SnippetString(
      `if (${replacement} === null) {\n${indent()}$0\n}`
    );
  }
}
