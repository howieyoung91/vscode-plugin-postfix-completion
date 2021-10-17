import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "java", label: "null" })
class NullPostfixHandler4J extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(
      `if (${replacement} == null) {\n${indent()}$0\n}`
    );
  }
}
