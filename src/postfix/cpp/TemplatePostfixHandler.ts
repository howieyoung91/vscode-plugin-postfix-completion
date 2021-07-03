import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler({ language: "cpp", label: "template" })
class TemplatePostfixHandler4Cpp extends BasePostfixHandler {
  // 这个匹配项要求不出现数字,待优化~
  @Target.Regex.Search({ regex: /^\s*[a-zA-Z_]+[\s+a-zA-Z_]*\s*$/ })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    const types = replacement.trim().trimEnd().split(/\s+/);
    let typeString = ``;
    for (let type of types) {
      typeString += `typename ${type},`;
    }
    typeString = typeString.substring(0, typeString.length - 1);
    const newText = `template <${typeString}>`;
    return new SnippetString(newText);
  }
}
