/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import { EnablePostfixSuggestion } from "../../../base/decorator/Enable";
import { Return } from "../../../base/decorator/Return";
import { Filter } from "../../../base/decorator/Filter";
import { HandleResult, PostfixHandler } from "../../../base/support/PostfixHandler";
import { indent } from "../../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "java", label: "try" })
class Try extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string): HandleResult {
        return new SnippetString(`try {\n${indent()}${replacement}\$0\n} catch(\${1:RuntimeException e}) {\n}`);
    }
}
