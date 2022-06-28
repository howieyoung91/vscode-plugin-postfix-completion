import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "markdown", label: "img" })
class ImgPostfixHandler extends BasePostfixHandler {
    @Target.Regex.Search(
        /((https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])|([a-zA-Z]:(\/[0-9a-zA-Z\u4e00-\u9fa5]*))/
    )
    // |^[a-zA-Z]:(\\[0-9a-zA-Z\u4e00-\u9fa5]*)$
    @Return.Replace()
    handleLineText(replacement: string) {
        return new SnippetString(`![\${1:alt}](${replacement})`);
    }
}
