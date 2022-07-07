/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion(
    { language: "javascript", label: "warn" },
    { language: "typescript", label: "warn" },
    { language: "vue", label: "warn" },
    { language: "html", label: "warn" },
    { language: "javascriptreact", label: "warn" },
    { language: "typescriptreact", label: "warn" }
)
class WarnPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        return `console.warn(${replacement});`;
    }
}
