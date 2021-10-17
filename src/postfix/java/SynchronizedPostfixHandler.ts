import { timeStamp } from "console";
import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler({ language: "java", label: "synchronized" })
class SynchronizedPostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string) {
    return new SnippetString(
      `synchronized(${replacement}) {\n${indent()}$0\n}`
    );
  }
}
