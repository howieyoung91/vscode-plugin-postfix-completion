/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixHandler from "../../base/suggest/PostfixHandler";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";

@EnablePostfixSuggestion({ language: "cpp", label: "addr" }, { language: "c", label: "addr" })
class AddrPostfixHandler4Cpp extends PostfixHandler {
    @Target.Regex.Match({ regex: /\s*[a-zA-Z_][a-zA-Z_0-9]*$/, start: " ", end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        data["startIndex"]++;
        return `&${replacement.trim()}`;
    }
}
