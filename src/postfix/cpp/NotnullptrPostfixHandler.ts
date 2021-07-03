import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "cpp", label: "notnullptr" })
class NotnullptrPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Interval({ end: "." })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    const newText = `if (${replacement} != nullptr){\n${indent()}$1\n}`;
    return new SnippetString(newText);
  }
}
