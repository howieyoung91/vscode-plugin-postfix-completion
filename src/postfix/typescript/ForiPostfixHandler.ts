import { timeStamp } from "console";
import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "fori" },
  { language: "typescript", label: "fori" },
  { language: "vue", label: "fori" },
  { language: "html", label: "fori" }
)
class ForiPostfixHandler4TsAndJs extends BasePostfixHandler {
  @Target.Interval({ start: " " })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas) {
    datas.startIndex++;
    return new SnippetString(
      `for (let \${1:i} = 0; \${1:i} < ${replacement.trim()}; \${1:i}++) {\n${indent()}$2\n}`
    );
  }
}
