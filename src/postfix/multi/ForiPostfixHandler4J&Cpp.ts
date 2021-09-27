import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {Return} from "../../base/decorator/Return";
import {Target} from "../../base/decorator/Target";
import {PostfixHandler} from "../../base/ioc/decorator/PostfixHandler";
import {indent} from "../../util/DocumentUtil";

@PostfixHandler(
  {language: "java", label: "fori"},
  {language: "c", label: "fori"},
  {language: "cpp", label: "fori"}
)
class ForiPostfixHandler extends BasePostfixHandler {
  @Target.Slice({start: " "})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    datas["startIndex"]++;
    return new SnippetString(
      `for (int \${1:i} = 0; \${1:i} < ${replacement.trim()}; \${1:i}++) {\n${indent()}$0\n}`
    );
  }
}
