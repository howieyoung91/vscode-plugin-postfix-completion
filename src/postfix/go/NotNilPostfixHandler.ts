import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {Return} from "../../base/decorator/Return";
import {Target} from "../../base/decorator/Target";
import {PostfixHandler} from "../../base/ioc/decorator/PostfixHandler";
import {indent} from "../../util/DocumentUtil";

@PostfixHandler({language: "go", label: "notnil"})
class NotNilPostfixHandler4Go extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`if ${replacement} != nil {\n${indent()}$0\n}`);
  }
}
