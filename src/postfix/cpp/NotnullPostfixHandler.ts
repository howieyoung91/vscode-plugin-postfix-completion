import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "c", label: "notnull" })
class NotnullPostfixHandler4C extends BasePostfixHandler {
  @Target.Interval({ end: "." })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    const newText = `if (${replacement} != NULL){\n${indent()}$0\n}`;
    return new SnippetString(newText);
  }
}
