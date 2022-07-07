/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "javascript", label: "forin" },
    { language: "typescript", label: "forin" },
    { language: "vue", label: "forin" },
    { language: "html", label: "forin" },
    { language: "javascriptreact", label: "forin" },
    { language: "typescriptreact", label: "forin" }
)
class ForinPostfixHandler extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data) {
        data.startIndex++;
        return new SnippetString(`for (const \${1:item} in ${replacement.trim()}){\n${indent()}$0\n}`);
    }
}
