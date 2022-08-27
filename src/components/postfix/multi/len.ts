/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { PostfixHandler } from "../../../base/suggest/PostfixHandler";
import { Return } from "../../../base/decorator/Return";
import { Filter } from "../../../base/decorator/Filter";
import { EnablePostfixSuggestion } from "../../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "python", label: "len" }, { language: "go", label: "len" })
class Len extends PostfixHandler {
    @Filter.Slice()
    @Filter.Regex.Search(/[a-zA-Z_][a-zA-Z_0-9]*$/g)
    @Return.Replace()
    handleTarget(replacement: string) {
        return `len(${replacement.trim()})`;
    }
}
