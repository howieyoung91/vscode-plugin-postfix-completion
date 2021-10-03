import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler({ language: "go", label: "var" })
class VarPostfixHandler4Go extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`\${1:varName} := ${replacement}`);
  }
}
