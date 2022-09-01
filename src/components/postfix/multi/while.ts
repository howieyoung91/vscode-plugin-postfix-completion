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
    { language: "java", label: "while" },
    { language: "c", label: "while" },
    { language: "cpp", label: "while" },
    { language: "csharp", label: "while" },
    { language: "javascript", label: "while" },
    { language: "typescript", label: "while" },
    { language: "vue", label: "while" },
    { language: "html", label: "while" }
)
class While extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`while (${replacement}) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "java", label: "dowhile" },
    { language: "c", label: "dowhile" },
    { language: "cpp", label: "dowhile" },
    { language: "csharp", label: "dowhile" },
    { language: "js", label: "dowhile" },
    { language: "ts", label: "dowhile" },
    { language: "javascriptreact", label: "dowhile" },
    { language: "typescriptreact", label: "dowhile" },
    { language: "vue", label: "dowhile" },
    { language: "html", label: "dowhile" }
)
class DoWhile extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`do {\n${indent()}\$0\n} while(${replacement.trim()});`);
    }
}
