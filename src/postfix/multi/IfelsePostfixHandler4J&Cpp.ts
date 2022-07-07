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
    { language: "java", label: "ifelse" },
    { language: "c", label: "ifelse" },
    { language: "cpp", label: "ifelse" },
    { language: "csharp", label: "ifelse" },
    { language: "javascript", label: "ifelse" },
    { language: "typescript", label: "ifelse" },
    { language: "vue", label: "ifelse" },
    { language: "html", label: "ifelse" }
)
class IfelsePostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement}) {\n${indent()}$0\n} else {\n${indent()}\n}`);
    }
}
