/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import { PostfixHandler } from "../../../base/suggest/PostfixHandler";
import { Return } from "../../../base/decorator/Return";
import { Filter } from "../../../base/decorator/Filter";
import { EnablePostfixSuggestion } from "../../../base/decorator/Enable";
import { indent } from "../../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "java", label: "fori" },
    { language: "c", label: "fori" },
    { language: "cpp", label: "fori" },
    { language: "csharp", label: "fori" }
)
class For extends PostfixHandler {
    @Filter.Slice()
    // @Filter.Regex.Search(/([0-9]+)|([a-zA-Z_][a-zA-Z_0-9]*)$/g)
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`for (int \${1:i} = 0; \${1:i} < ${replacement.trim()}; \${1:i}++) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "java", label: "forr" },
    { language: "c", label: "forr" },
    { language: "cpp", label: "forr" },
    { language: "csharp", label: "forr" }
)
class Forr extends PostfixHandler {
    @Filter.Slice()
    // @Filter.Regex.Search(/([0-9]+)|([a-zA-Z_][a-zA-Z_0-9]*)$/g)
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`for (int \${1:i} = ${replacement.trim()}; \${1:i} >= 0; \${1:i}--) {\n${indent()}$0\n}`);
    }
}
