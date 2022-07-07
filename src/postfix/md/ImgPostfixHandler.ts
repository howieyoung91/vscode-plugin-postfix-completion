/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "markdown", label: "img" })
class ImgPostfixHandler extends PostfixHandler {
    @Target.Regex.Search(
        /((https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])|([a-zA-Z]:(\/[0-9a-zA-Z\u4e00-\u9fa5]*))/
    )
    // |^[a-zA-Z]:(\\[0-9a-zA-Z\u4e00-\u9fa5]*)$
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`![\${1:alt}](${replacement})`);
    }
}
