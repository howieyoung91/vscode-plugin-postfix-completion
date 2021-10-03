import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "go", label: "for" })
class ForPostfixHandler4Go extends BasePostfixHandler {
  @Target.Slice({})
  @Return.DeleteText()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(
      `for \${1:i}, \${2:elem} := range ${replacement} {\n${indent()}\$0\n}`
    );
  }
}
