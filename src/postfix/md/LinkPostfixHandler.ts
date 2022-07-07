/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "markdown", label: "link" })
class LinkPostfixHandler extends PostfixHandler {
    @Target.Regex.Search(/(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/)
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`[\${1}](${replacement})`);
    }
}
