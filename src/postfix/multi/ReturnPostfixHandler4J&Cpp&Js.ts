/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion(
    { language: "java", label: "return" },
    { language: "c", label: "return" },
    { language: "cpp", label: "return" },
    { language: "csharp", label: "return" },
    { language: "javascript", label: "return" },
    { language: "typescript", label: "return" },
    { language: "vue", label: "return" },
    { language: "html", label: "return" }
)
class ReturnPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return `return ${replacement};`;
    }
}
