import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "forin" },
  { language: "typescript", label: "forin" },
  { language: "vue", label: "forin" },
  { language: "html", label: "forin" }
)
class ForinPostfixHandler extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.Replace()
  handleLineText(replacement: string, datas) {
    datas.startIndex++;
    return new SnippetString(
      `for (const \${1:item} in ${replacement.trim()}){\n${indent()}$0\n}`
    );
  }
}
