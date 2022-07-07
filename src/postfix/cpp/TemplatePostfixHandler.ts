/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "cpp", label: "template" })
class TemplatePostfixHandler4Cpp extends PostfixHandler {
    @Target.Regex.Match({ regex: /^[a-zA-Z_]+[\s+a-zA-Z_0-9]*\s*$/ })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        replacement = replacement.trimEnd();
        const types = replacement.split(/\s+/);
        let typeString = ``;
        for (let type of types) {
            typeString += `typename ${type},`;
        }
        typeString = typeString.substring(0, typeString.length - 1);
        const newText = `template <${typeString}>`;
        return new SnippetString(newText);
    }
}
