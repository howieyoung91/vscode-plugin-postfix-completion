/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { PostfixHandler } from "../../base/suggest/PostfixHandler";
import { Filter } from "../../base/decorator/Filter";
import { Return } from "../../base/decorator/Return";
import { SnippetString } from "vscode";
import { indent } from "../../util/DocumentUtil";
import TargetHandleResult from "../../base/suggest/TargetHandleResult";

// @EnablePostfixSuggestion(
//     { language: "javascript", label: "cast" },
//     { language: "typescript", label: "cast" },
//     { language: "vue", label: "cast" },
//     { language: "html", label: "cast" },
//     { language: "javascriptreact", label: "cast" },
//     { language: "typescriptreact", label: "cast" }
// )
// class Cast extends PostfixHandler {
//     @Filter.Slice({ start: " " })
//     @Return.Replace()
//     handleTarget(replacement: string, data: any) {
//         data.startIndex++;
//         return new SnippetString(`(<\${1:type}> ${replacement.trim()})`);
//     }
// }

@EnablePostfixSuggestion(
    { language: "javascript", label: "fori" },
    { language: "typescript", label: "fori" },
    { language: "vue", label: "fori" },
    { language: "html", label: "fori" },
    { language: "javascriptreact", label: "fori" },
    { language: "typescriptreact", label: "fori" }
)
class Fori extends PostfixHandler {
    @Filter.Slice()
    // @Filter.Regex.Search(/([0-9]+)|([a-zA-Z_][a-zA-Z_0-9]*)$/g)
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`for (let \${1:i} = 0; \${1:i} < ${replacement.trim()}; \${1:i}++) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "forr" },
    { language: "typescript", label: "forr" },
    { language: "vue", label: "forr" },
    { language: "html", label: "forr" },
    { language: "javascriptreact", label: "forr" },
    { language: "typescriptreact", label: "forr" }
)
class Forr extends PostfixHandler {
    @Filter.Slice()
    // @Filter.Regex.Search(/([0-9]+)|([a-zA-Z_][a-zA-Z_0-9]*)$/g)
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`for (let \${1:i} = ${replacement.trim()}; \${1:i} >= 0; \${1:i}--) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "forin" },
    { language: "typescript", label: "forin" },
    { language: "vue", label: "forin" },
    { language: "html", label: "forin" },
    { language: "javascriptreact", label: "forin" },
    { language: "typescriptreact", label: "forin" }
)
class Forin extends PostfixHandler {
    @Filter.Slice()
    // @Filter.Regex.Search(/([0-9]+)|([a-zA-Z_][a-zA-Z_0-9]*)$/g)
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`for (const \${1:item} in ${replacement.trim()}) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "forof" },
    { language: "typescript", label: "forof" },
    { language: "vue", label: "forof" },
    { language: "html", label: "forof" },
    { language: "javascriptreact", label: "forof" },
    { language: "typescriptreact", label: "forof" }
)
class Forof extends PostfixHandler {
    @Filter.Slice()
    // @Filter.Regex.Search(/([0-9]+)|([a-zA-Z_][a-zA-Z_0-9]*)$/g)
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`for (const \${1:item} of ${replacement.trim()}) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "log" },
    { language: "typescript", label: "log" },
    { language: "vue", label: "log" },
    { language: "html", label: "log" },
    { language: "javascriptreact", label: "log" },
    { language: "typescriptreact", label: "log" }
)
class Log extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `console.log(${replacement});`;
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "err" },
    { language: "typescript", label: "err" },
    { language: "vue", label: "err" },
    { language: "html", label: "err" },
    { language: "javascriptreact", label: "err" },
    { language: "typescriptreact", label: "err" }
)
class Error extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `console.error(${replacement});`;
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "warn" },
    { language: "typescript", label: "warn" },
    { language: "vue", label: "warn" },
    { language: "html", label: "warn" },
    { language: "javascriptreact", label: "warn" },
    { language: "typescriptreact", label: "warn" }
)
class Warn extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `console.warn(${replacement});`;
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "null" },
    { language: "typescript", label: "null" },
    { language: "vue", label: "null" },
    { language: "html", label: "null" },
    { language: "javascriptreact", label: "null" },
    { language: "typescriptreact", label: "null" }
)
class Null extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} === null) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "notnull" },
    { language: "typescript", label: "notnull" },
    { language: "vue", label: "notnull" },
    { language: "html", label: "notnull" },
    { language: "javascriptreact", label: "notnull" },
    { language: "typescriptreact", label: "notnull" }
)
class NotNull extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} !== null) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "undefined" },
    { language: "typescript", label: "undefined" },
    { language: "vue", label: "undefined" },
    { language: "html", label: "undefined" },
    { language: "javascriptreact", label: "undefined" },
    { language: "typescriptreact", label: "undefined" }
)
class Undefined extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} === undefined) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion(
    { language: "javascript", label: "notundefined" },
    { language: "typescript", label: "notundefined" },
    { language: "vue", label: "notundefined" },
    { language: "html", label: "notundefined" },
    { language: "javascriptreact", label: "notundefined" },
    { language: "typescriptreact", label: "notundefined" }
)
class NotUndefined extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} !== undefine) {\n${indent()}$0\n}`);
    }
}

// @DefinePostfixHandler({ language: "javascript", label: "let" })
class Let extends PostfixHandler {
    handleTarget(lineText: string): string | SnippetString | TargetHandleResult | null {
        /*
          ① new  String().let -> let varName = new String();
          ② \s+ sb.    doSth(sb.doSth(arg1, arg2), arg3).let -> let varName = sb.doSth(sb.doSth(arg1, arg2), arg3);
          ③  123.let -> let varName = 123;
          ③  a.  b.let -> let varName = 123;
         */
        let startIndex;
        let endIndex = lineText.lastIndexOf(".");
        // 找到第一个new
        let newIndex = lineText.indexOf("new");
        let replacement = lineText.substring(newIndex, endIndex);
        for (;;) {
            if (!replacement.match(/^new\s+[a-zA-Z0-9_.]+\(.*\)\.[let]{0,3}$/)) {
                newIndex = lineText.indexOf("new", newIndex + 3);
                // 如果找不到
                if (newIndex === -1) {
                    break;
                }
                replacement = lineText.substring(newIndex, endIndex);
                continue;
            }
            // 匹配成功
            return {
                text: `let varName = ${replacement};`,
                detail: `postfix`,
                data: {
                    startIndex: newIndex,
                    endIndex,
                },
            };
        }

        let whiteSpaceIndex = lineText.lastIndexOf(" ") + 1;
        replacement = lineText.substring(whiteSpaceIndex, endIndex);
        return {
            text: `let varName = ${replacement};`,
            deleteText: {
                start: whiteSpaceIndex,
                end: endIndex + 1,
            },
        };
    }
}
