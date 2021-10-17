import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {Return} from "../../base/decorator/Return";
import {Target} from "../../base/decorator/Target";
import {PostfixHandler} from "../../base/ioc/decorator/PostfixHandler";
import {indent} from "../../util/DocumentUtil";

@PostfixHandler(
  {language: "java", label: "if"},
  {language: "c", label: "if"},
  {language: "cpp", label: "if"},
  {language: "javascript", label: "if"},
  {language: "typescript", label: "if"},
  {language: "vue", label: "if"},
  {language: "html", label: "if"}
)
class IfPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string) {
    return new SnippetString(`if (${replacement}) {\n${indent()}$0\n}`);
  }
}
