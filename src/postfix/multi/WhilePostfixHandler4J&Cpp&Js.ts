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
    { language: "java", label: "while" },
    { language: "c", label: "while" },
    { language: "cpp", label: "while" },
    { language: "csharp", label: "while" },
    { language: "javascript", label: "while" },
    { language: "typescript", label: "while" },
    { language: "vue", label: "while" },
    { language: "html", label: "while" }
)
class WhilePostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`while (${replacement}) {\n${indent()}$0\n}`);
    }
}
