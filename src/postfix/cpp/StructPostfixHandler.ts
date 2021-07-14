import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@PostfixHandler(
  { language: "cpp", label: "struct" },
  { language: "c", label: "struct" }
)
class StructPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Interval({ start: " " })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    datas["startIndex"]++;
    return new SnippetString(
      `struct ${replacement.trim()} {\n${indent()}$1\n}`
    );
  }
}
