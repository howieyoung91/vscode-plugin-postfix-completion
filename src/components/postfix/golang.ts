/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { EnablePostfixSuggestion } from "../../base/decorator/Enable";
import { PostfixHandler } from "../../base/suggest/PostfixHandler";
import { Filter } from "../../base/decorator/Filter";
import { Return } from "../../base/decorator/Return";
import { SnippetString } from "vscode";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "go", label: ":" })
class Var extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`\${1:varName} := ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "var" })
class Var_2 extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`var \${1:varName} = ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "const" })
class Const extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`const \${1:varName} \${2:type} = ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "err" })
class Err extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`errors.New(${replacement})`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "for" })
class For extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`for \${1:i}, \${2:elem} := range ${replacement} {\n${indent()}\$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "if" })
class If extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if ${replacement} {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "nil" })
class Nil extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if ${replacement} == nil {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "notnil" })
class Notnil extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if ${replacement} != nil {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "printf" })
class Print extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `fmt.Printf("%+v\\n",${replacement})`;
    }
}

@EnablePostfixSuggestion({ language: "go", label: "println" })
class Println extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `fmt.Println(${replacement})`;
    }
}

@EnablePostfixSuggestion({ language: "go", label: "struct" })
class Struct extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`type ${replacement} struct {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "interface" })
class Interface extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string): SnippetString {
        return new SnippetString(`type ${replacement} interface {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "switch" })
class Switch extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`switch ${replacement} {\n${indent()}case \${1:condition}:\n${indent()}${indent()}$0\n}`);
    }
}
