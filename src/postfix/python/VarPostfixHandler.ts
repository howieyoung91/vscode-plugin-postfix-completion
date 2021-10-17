import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler({ language: "python", label: "var" })
class VarPostfixHandler4Py extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`\${1:varName} = ${replacement}`);
  }
}
