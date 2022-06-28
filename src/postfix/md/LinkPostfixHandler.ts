import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "markdown", label: "link" })
class LinkPostfixHandler extends BasePostfixHandler {
  @Target.Regex.Search(/(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/)
  @Return.Replace()
  handleLineText(replacement: string) {
    return new SnippetString(`[\${1}](${replacement})`);
  }
}
