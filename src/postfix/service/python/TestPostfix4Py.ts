import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler({ language: "python", label: "test" })
class TestPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    datas: {}
  ): string | SnippetString | LinetextHandleResult | null {
    return `test ok!`;
  }
}
