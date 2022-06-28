import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
  { language: "cpp", label: "delete[]" },
  { language: "c", label: "delete[]" }
)
class DeleteArrayPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Slice({ start: " " })
  @Return.Replace()
  handleLineText(replacement: string, data) {
    data.startIndex++;
    return `delete[] ${replacement.trim().trimEnd()};`;
  }
}
