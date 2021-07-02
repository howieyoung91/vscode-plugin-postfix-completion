import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import StringUtil from "../../util/StringUtil";
import { indent } from "../../util/DocumentUtil";
import { Target } from "../../base/decorator/Target";

@PostfixHandler({ language: "python", label: "for" })
class ForPostfixHandler4Py extends BasePostfixHandler {
  @Target.Interval({})
  handleLineText(replacement: string, datas: {}): LinetextHandleResult {
    let newText;
    let documentation;
    let indentChars = indent();
    if (StringUtil.isInt(replacement)) {
      newText = `for \${1:i} in range(${replacement}):\n${indentChars}`;
      documentation = `for \${1:i} in range(${replacement}):\n${indentChars}`;
    } else {
      newText = `for \${1:i} in ${replacement}:\n${indentChars}`;
      documentation = `for \${1:i} in ${replacement}:\n${indentChars}`;
    }
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
