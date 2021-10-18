import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {PostfixHandler} from "../../base/decorator/PostfixHandler";
import {Target} from "../../base/decorator/Target";
import {Return} from "../../base/decorator/Return";

@PostfixHandler({language: "markdown", label: "h4"})
class H4PostfixHandler extends BasePostfixHandler {
  @Target.Slice({})
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`#### ${replacement}`);
  }
}
