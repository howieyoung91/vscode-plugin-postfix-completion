import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler({ language: "cpp", label: "template" })
class TemplatePostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Regex.Match({ regex: /^[a-zA-Z_]+[\s+a-zA-Z_0-9]*\s*$/ })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    replacement = replacement.trimEnd();
    const types = replacement.split(/\s+/);
    let typeString = ``;
    for (let type of types) {
      typeString += `typename ${type},`;
    }
    typeString = typeString.substring(0, typeString.length - 1);
    const newText = `template <${typeString}>`;
    return new SnippetString(newText);
  }
}
