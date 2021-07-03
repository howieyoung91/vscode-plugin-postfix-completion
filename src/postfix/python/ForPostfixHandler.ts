import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import StringUtil from "../../util/StringUtil";
import { indent } from "../../util/DocumentUtil";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "python", label: "for" })
class ForPostfixHandler4Py extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    let newText;
    let indentChars = indent();
    if (StringUtil.isInt(replacement)) {
      newText = `for \${1:i} in range(${replacement}):\n${indentChars}`;
    } else {
      newText = `for \${1:i} in ${replacement}:\n${indentChars}`;
    }
    return new SnippetString(newText);
  }
}
