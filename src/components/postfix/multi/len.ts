/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixHandler from "../../../base/suggest/PostfixHandler";
import { Return } from "../../../base/decorator/Return";
import { Target } from "../../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "python", label: "len" }, { language: "go", label: "len" })
class Len extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data: any) {
        data.startIndex++;
        return `len(${replacement.trim()})`;
    }
}
