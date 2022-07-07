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
    { language: "javascript", label: "null" },
    { language: "typescript", label: "null" },
    { language: "vue", label: "null" },
    { language: "html", label: "null" },
    { language: "javascriptreact", label: "null" },
    { language: "typescriptreact", label: "null" }
)
class NullPostfixHandler4TsJs extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} === null) {\n${indent()}$0\n}`);
    }
}
