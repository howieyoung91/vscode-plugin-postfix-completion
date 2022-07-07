/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion(
    { language: "javascript", label: "log" },
    { language: "typescript", label: "log" },
    { language: "vue", label: "log" },
    { language: "html", label: "log" },
    { language: "javascriptreact", label: "log" },
    { language: "typescriptreact", label: "log" }
)
class LogPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return `console.log(${replacement});`;
    }
}
