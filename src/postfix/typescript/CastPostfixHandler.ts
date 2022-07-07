/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion(
    { language: "javascript", label: "cast" },
    { language: "typescript", label: "cast" },
    { language: "vue", label: "cast" },
    { language: "html", label: "cast" },
    { language: "javascriptreact", label: "cast" },
    { language: "typescriptreact", label: "cast" }
)
class CastPostfixHandler extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data: any) {
        data.startIndex++;
        return new SnippetString(`(<\${1:type}> ${replacement.trim()})`);
    }
}
