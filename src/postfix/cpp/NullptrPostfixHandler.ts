import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "cpp", label: "nullptr" })
class NullptrPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Interval({ end: "." })
  handleLineText(replacement: string, datas: {}): LineTextHandleResult {
    const newText = `if (${replacement} == nullptr){\n${indent()}$1\n}`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
