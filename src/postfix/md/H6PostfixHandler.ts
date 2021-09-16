import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {PostfixHandler} from "../../base/ioc/decorator/PostfixHandler";
import {Target} from "../../base/decorator/Target";
import {Return} from "../../base/decorator/Return";

@PostfixHandler({language: "markdown", label: "h6"})
class H6PostfixHandler extends BasePostfixHandler {
  @Target.Interval({})
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`###### ${replacement}`);
  }
}
