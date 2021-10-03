import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "markdown", label: "container" })
class ContainerPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`::: ${replacement}\n$0\n:::`);
  }
}
