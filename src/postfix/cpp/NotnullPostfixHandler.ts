/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "c", label: "notnull" })
class NotnullPostfixHandler4C extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        const newText = `if (${replacement} != NULL) {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}
