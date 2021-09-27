import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "markdown", label: "img" })
class ImgPostfixHandler extends BasePostfixHandler {
  @Target.Regex.Search({
    regex: /(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/,
  })
  @Return.DeleteText({})
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`![\${1:alt}](${replacement})`);
  }
}
