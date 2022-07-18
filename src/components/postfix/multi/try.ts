/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import { EnablePostfixSuggestion } from "../../../base/decorator/EnablePostfixSuggestion";
import { Return } from "../../../base/decorator/Return";
import { Target } from "../../../base/decorator/Target";
import PostfixHandler, { HandleResult } from "../../../base/suggest/PostfixHandler";
import { indent } from "../../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "java", label: "try" })
class Try extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string): HandleResult {
        return new SnippetString(`try {${indent()}${replacement}\$0} catch(\${1:RuntimeException e}) {}`);
    }
}
