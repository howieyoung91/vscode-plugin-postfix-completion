import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { indent } from "../../util/DocumentUtil";
import { SnippetString } from "vscode";

@PostfixHandler({ language: "java", label: "instanceof" })
class InstanceofPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(
      `if (${replacement} instanceof $1) {\n${indent()}$0\n}`
    );
  }
}
