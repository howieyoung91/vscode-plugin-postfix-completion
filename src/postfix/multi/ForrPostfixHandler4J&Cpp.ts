import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "java", label: "forr" },
  { language: "c", label: "forr" },
  { language: "cpp", label: "forr" },
  { language: "csharp", label: "forr" }
)
class ForrPostfixHandler extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.Replace()
  handleLineText(replacement: string, datas: any) {
    datas.startIndex++;
    return new SnippetString(
      `for (int \${1:i} = ${replacement.trim()}; \${1:i} >= 0; \${1:i}--) {\n${indent()}$0\n}`
    );
  }
}
