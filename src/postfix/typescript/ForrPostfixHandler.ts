import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "forr" },
  { language: "typescript", label: "forr" },
  { language: "vue", label: "forr" },
  { language: "html", label: "forr" }
)
class ForrPostfixHandler extends BasePostfixHandler {
  @Target.Interval({ start: " " })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: any) {
    datas.startIndex++;
    return new SnippetString(
      `for (let \${1:i} = ${replacement.trim()}; \${1:i} >= 0; \${1:i}--) {\n${indent()}$2\n}`
    );
  }
}
