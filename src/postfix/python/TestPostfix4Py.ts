import { SnippetString } from "vscode";
import BasePostfix from "../abs/BasePostfix";
import BasePostfixHandler from "../abs/BasePostfixHandler";
import LinetextHandleResult from "../abs/LinetextHandleResult";
import Postfix from "../decorator/Postfix";
import { PostfixHandler } from "../decorator/PostfixHandler";

@Postfix({ language: "python", label: "test" })
export default class TestPostfix4Py extends BasePostfix {}

@PostfixHandler({ language: "python", label: "test" })
class TestPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(
    lineText: string,
    datas: {}
  ): string | SnippetString | LinetextHandleResult | null {
    return `test ok!`;
  }
}
