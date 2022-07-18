/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";
import { SnippetString } from "vscode";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "cpp", label: "addr" }, { language: "c", label: "addr" })
class Addr extends PostfixHandler {
    @Target.Regex.Match({ regex: /\s*[a-zA-Z_][a-zA-Z_0-9]*$/, start: " ", end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        data["startIndex"]++;
        return `&${replacement.trim()}`;
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "ptr" }, { language: "c", label: "ptr" })
class Ptr extends PostfixHandler {
    @Target.Regex.Match({ regex: /\s*[a-zA-Z_][a-zA-Z_0-9]*$/, start: " ", end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        data["startIndex"]++;
        return `*${replacement.trim()}`;
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "cin" })
export class Cin extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        return `std::cin >> ${replacement};`;
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "cout" })
class Cout extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        return new SnippetString(`std::cout << ${replacement} << std::endl;`);
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "class" })
class Class extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        data["startIndex"]++;
        return new SnippetString(`class ${replacement.trim()} {\n${indent()}$0\n};`);
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "struct" }, { language: "c", label: "struct" })
class Struct extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        data["startIndex"]++;
        return new SnippetString(`struct ${replacement.trim()} {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "delete" }, { language: "c", label: "delete" })
class Delete extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data) {
        data.startIndex++;
        return `delete ${replacement.trim().trimEnd()};`;
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "delete[]" }, { language: "c", label: "delete[]" })
class DeleteArray extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data) {
        data.startIndex++;
        return `delete[] ${replacement.trim().trimEnd()};`;
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "include" }, { language: "c", label: "include" })
class Include extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data: any) {
        data.startIndex++;
        return `#include "${replacement.trim()}"`;
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "define" }, { language: "c", label: "define" })
class Define extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data) {
        data.startIndex++;
        return `#define ${replacement.trim()} `;
    }
}

@EnablePostfixSuggestion({ language: "c", label: "notnull" })
class NotNull extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        const newText = `if (${replacement} != NULL) {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "notnullptr" })
class NotNullptr extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        const newText = `if (${replacement} != nullptr) {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}

@EnablePostfixSuggestion({ language: "c", label: "null" })
class Null extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        return new SnippetString(`if (${replacement} == NULL) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "nullptr" })
class Nullptr extends PostfixHandler {
    @Target.Slice()
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        return new SnippetString(`if (${replacement} == nullptr) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "cpp", label: "template" })
class Template extends PostfixHandler {
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
