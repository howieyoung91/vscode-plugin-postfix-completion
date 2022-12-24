/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import { EnablePostfixSuggestion } from "../../base/decorator/Enable";
import { Filter } from "../../base/decorator/Filter";
import { Return } from "../../base/decorator/Return";
import { HandleResult, PostfixHandler } from "../../base/support/PostfixHandler";

@EnablePostfixSuggestion({ language: "vue", label: "ref" })
class Ref extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(target: string): HandleResult {
        return new SnippetString(`const \${0:name} = ref(${target})`);
    }
}
