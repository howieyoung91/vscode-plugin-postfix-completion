import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "forof" },
  { language: "typescript", label: "forof" },
  { language: "vue", label: "forof" },
  { language: "html", label: "forof" },
  { language: "javascriptreact", label: "forof" },
  { language: "typescriptreact", label: "forof" }
)
class ForofPostfixHandler extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.Replace()
  handleLineText(replacement: string, datas: any) {
    datas.startIndex++;
    return new SnippetString(
      `for (const \${1:item} of ${replacement.trim()}){\n${indent()}$0\n}`
    );
  }
}
