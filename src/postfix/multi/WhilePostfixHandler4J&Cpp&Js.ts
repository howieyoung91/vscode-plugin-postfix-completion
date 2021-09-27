import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "java", label: "while" },
  { language: "c", label: "while" },
  { language: "cpp", label: "while" },
  { language: "javascript", label: "while" },
  { language: "typescript", label: "while" },
  { language: "vue", label: "while" },
  { language: "html", label: "while" }
)
class WhilePostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText({})
  handleLineText(replacement: string) {
    return new SnippetString(`while (${replacement}) {\n${indent()}$0\n}`);
  }
}
