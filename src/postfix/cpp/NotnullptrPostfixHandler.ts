import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "cpp", label: "notnullptr" })
class NotnullptrPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Slice({ end: "." })
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    const newText = `if (${replacement} != nullptr) {\n${indent()}$0\n}`;
    return new SnippetString(newText);
  }
}
