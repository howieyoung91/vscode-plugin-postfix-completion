/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Source } from "../../base/decorator/Source";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";

// @EnablePostfixSuggestion({ language: "c", label: "test" })
export default class TestPostfixHandler extends PostfixHandler {
    // @Source.DocumentBetween({
    //     startLineNumber: 0,
    //     endLineNumber: 5,
    //     limit: 2,
    // })
    @Source.Document()
    // @Source.LineTextAt(0)
    @Target.Slice({})
    @Return.Replace()
    handleTarget(lineText: string, data: {}): string {
        return lineText;
    }
}
