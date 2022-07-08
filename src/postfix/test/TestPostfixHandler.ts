/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import PostfixHandler from "../../base/suggest/PostfixHandler";

// @EnablePostfixSuggestion({ language: "c", label: "test" })
export default class TestPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(lineText: string, data: {}): string {
        return lineText;
    }
}
