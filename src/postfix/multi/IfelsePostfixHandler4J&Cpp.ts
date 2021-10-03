import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {Return} from "../../base/decorator/Return";
import {Target} from "../../base/decorator/Target";
import {PostfixHandler} from "../../base/ioc/decorator/PostfixHandler";
import {indent} from "../../util/DocumentUtil";

@PostfixHandler(
  {language: "java", label: "ifelse"},
  {language: "c", label: "ifelse"},
  {language: "cpp", label: "ifelse"},
  {language: "javascript", label: "ifelse"},
  {language: "typescript", label: "ifelse"},
  {language: "vue", label: "ifelse"},
  {language: "html", label: "ifelse"}
)
class IfelsePostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText()
  handleLineText(replacement: string) {
    return new SnippetString(
      `if (${replacement}) {\n${indent()}$0\n} else {\n${indent()}\n}`
    );
  }
}
