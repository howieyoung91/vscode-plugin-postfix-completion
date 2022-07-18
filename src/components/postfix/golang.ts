import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";
import { SnippetString } from "vscode";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "go", label: ":" })
class Var extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`\${1:varName} := ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "var" })
class Var_2 extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`var \${1:varName} = ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "const" })
class Const extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        return new SnippetString(`const \${1:varName} \${2:type} = ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "err" })
class Err extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`errors.New(${replacement})`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "for" })
class For extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`for \${1:i}, \${2:elem} := range ${replacement} {\n${indent()}\$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "if" })
class If extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if ${replacement} {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "nil" })
class Nil extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if ${replacement} == nil {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "notnil" })
class Notnil extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if ${replacement} != nil {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "printf" })
class Print extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return `fmt.Printf("%+v\\n",${replacement})`;
    }
}

@EnablePostfixSuggestion({ language: "go", label: "println" })
class Println extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return `fmt.Println(${replacement})`;
    }
}

@EnablePostfixSuggestion({ language: "go", label: "struct" })
class Struct extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        const newText = `type ${replacement} struct {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "interface" })
class Interface extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string): SnippetString {
        return new SnippetString(`type ${replacement} interface {\n${indent()}$0\n}`);
    }
}

@EnablePostfixSuggestion({ language: "go", label: "switch" })
class Switch extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`switch ${replacement} {\n${indent()}case \${1:condition}:\n${indent()}${indent()}$0\n}`);
    }
}
