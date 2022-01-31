import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
  { language: "java", label: "not" },
  { language: "c", label: "not" },
  { language: "cpp", label: "not" },
  { language: "csharp", label: "not" },
  { language: "javascript", label: "not" },
  { language: "typescript", label: "not" },
  { language: "vue", label: "not" },
  { language: "html", label: "not" }
)
class NotPostfixHandler extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.Replace()
  handleLineText(replacement: string, datas: any) {
    datas.startIndex++;
    return `!${replacement.trim()}`;
  }
}
