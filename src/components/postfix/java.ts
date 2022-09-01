/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { EnablePostfixSuggestion } from "../../base/decorator/Enable";
import { PostfixHandler } from "../../base/suggest/PostfixHandler";
import { Keys, Filter } from "../../base/decorator/Filter";
import { Return } from "../../base/decorator/Return";
import { indent } from "../../util/DocumentUtil";
import { SnippetString } from "vscode";
import { HandleResult } from "../../base/suggest/PostfixHandler";

@EnablePostfixSuggestion({ language: "java", label: "assert" })
class Assert extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `assert ${replacement};`;
    }
}

@EnablePostfixSuggestion({ language: "java", label: "foreach" })
class Foreach extends PostfixHandler {
    handleTarget(lineText: string): HandleResult {
        let startIndex = lineText.lastIndexOf(" ") + 1;
        let endIndex = lineText.lastIndexOf(".");
        // 获取数字
        let replacement = lineText.substring(startIndex, endIndex).trimEnd();
        if (replacement.length === 0) {
            return null;
        }
        let newText = ``;
        // 判断是否是数字
        if (replacement.match(/^[0-9]+.?[0-9]*$/)) {
            newText = `for (int \${1:i} = 0; \${1:i} < ${replacement}; \${1:i}++) {\n${indent()}$0\n}`;
        } else {
            newText = `for (var \${1:item} : ${replacement}) {\n${indent()}$0\n}`;
        }
        return {
            text: new SnippetString(newText),
            deleteText: { start: startIndex, end: endIndex + 1 },
        };
    }
}

@EnablePostfixSuggestion({ language: "java", label: "instanceof" })
class Instanceof extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} instanceof $1) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "java", label: "notnull" })
class NotNull extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} != null) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "java", label: "null" })
class Null extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} == null) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "java", label: "sout" })
class Sout extends PostfixHandler {
    @Filter.Slice()
    handleTarget(replacement: string, attribute: {}): HandleResult {
        let res = { text: null, deleteText: null };
        // 判断是否为空
        if (replacement.length === 0) {
            res.text = new SnippetString(`System.out.println($1);`);
        } else {
            res.text = new SnippetString(`System.out.println(${replacement});`);
            res.deleteText = { start: attribute[Keys.START], end: attribute["endIndex"] + 1 };
        }
        return res;
    }
}

@EnablePostfixSuggestion({ language: "java", label: "souf" })
class Souf extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`System.out.printf("$1",${replacement});`);
    }
}

@EnablePostfixSuggestion({ language: "java", label: "serr" })
class Serr extends PostfixHandler {
    @Filter.Slice()
    handleTarget(replacement: string, attribute: {}): HandleResult {
        let res = { text: null, deleteText: null };
        // 判断是否为空
        if (replacement.length === 0) {
            res.text = new SnippetString(`System.err.println($1);`);
        } else {
            res.text = new SnippetString(`System.err.println(${replacement});`);
            res.deleteText = { start: attribute[Keys.START], end: attribute["endIndex"] + 1 };
        }
        return res;
    }
}

@EnablePostfixSuggestion({ language: "java", label: "synchronized" })
class Synchronized extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`synchronized (${replacement}) {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "java", label: "requirenonnull" })
class RequireNonNull extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`Objects.requireNonNull(${replacement}, $0);`);
    }
}
