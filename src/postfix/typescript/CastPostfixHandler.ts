import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler(
  { language: "javascript", label: "cast" },
  { language: "typescript", label: "cast" },
  { language: "vue", label: "cast" },
  { language: "html", label: "cast" }
)
class CastPostfixHandler extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: any) {
    datas.startIndex++;
    return new SnippetString(`(<\${1:type}> ${replacement.trim()})`);
  }
}
