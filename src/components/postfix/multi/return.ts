/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { PostfixHandler } from "../../../base/support/PostfixHandler";
import { Return } from "../../../base/decorator/Return";
import { Filter } from "../../../base/decorator/Filter";
import { EnablePostfixSuggestion } from "../../../base/decorator/Enable";

@EnablePostfixSuggestion({ language: "python", label: "return" }, { language: "go", label: "return" })
class Return4PyGo extends PostfixHandler {
    @Filter.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return `return ${replacement}`;
    }
}

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
class ReturnMore extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `return ${replacement};`;
    }
}
