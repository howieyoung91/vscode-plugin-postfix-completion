/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { PostfixHandler } from "../../../base/support/PostfixHandler";
import { Return } from "../../../base/decorator/Return";
import { Keys, Filter } from "../../../base/decorator/Filter";
import { EnablePostfixSuggestion } from "../../../base/decorator/Enable";

// @EnablePostfixSuggestion(
//     { language: "java", label: "not" },
//     { language: "c", label: "not" },
//     { language: "cpp", label: "not" },
//     { language: "csharp", label: "not" },
//     { language: "javascript", label: "not" },
//     { language: "typescript", label: "not" },
//     { language: "vue", label: "not" },
//     { language: "html", label: "not" }
// )
class Not extends PostfixHandler {
    @Filter.Slice()
    @Filter.Regex.Search(/[a-zA-Z_][a-zA-Z_0-9]*$/g)
    @Return.Replace()
    handleTarget(replacement: string) {
        return `!${replacement.trim()}`;
    }
}
