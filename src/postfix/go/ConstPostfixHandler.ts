import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler({ language: "go", label: "const" })
class ConstPostfixHandler4Go extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`const \${1:varName} \${2:type} = ${replacement}`);
  }
}
