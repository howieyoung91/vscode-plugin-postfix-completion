import { timeStamp } from "console";
import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "java", label: "synchronized" })
class SynchronizedPostfixHandler extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {


    return new SnippetString(
      `synchronized(${replacement}) {\n${indent()}$1\n}`
    );
  }
}
