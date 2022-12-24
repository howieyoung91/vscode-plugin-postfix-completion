/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { EnablePostfixSuggestion } from "../../base/decorator/Enable";
import { PostfixHandler } from "../../base/support/PostfixHandler";
import { Keys, Filter } from "../../base/decorator/Filter";
import { Return } from "../../base/decorator/Return";
import { SnippetString } from "vscode";

@EnablePostfixSuggestion({ language: "markdown", label: "h1" })
class H1 extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`# ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "h2" })
class H2 extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`## ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "h3" })
class H3 extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`### ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "h4" })
class H4 extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`#### ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "h5" })
class H5 extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`##### ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "h6" })
class H6 extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`###### ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "img" })
class Img extends PostfixHandler {
    @Filter.Slice()
    @Filter.Validation.Contains(
        /((https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])|([a-zA-Z]:(\/[0-9a-zA-Z\u4e00-\u9fa5]*))/
    )
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`![\${1:alt}](${replacement})`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "link" })
class Link extends PostfixHandler {
    @Filter.Slice()
    @Filter.Validation.Contains(/(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/)
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`[\${1}](${replacement})`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "table" })
class Table extends PostfixHandler {
    @Filter.Slice()
    @Filter.Validation.Contains(/[0-9]+\s+[0-9]+/)
    @Return.Replace()
    handleTarget(replacement: string) {
        // 分割空格,找到数据
        let nums = replacement.split(/\s+/);
        // 如果行和列不是整数
        let row = Number(nums[nums.length - 2]);
        let col = Number(nums[nums.length - 1]);
        if (row == 0 || col == 0) {
            return null;
        }
        let res = "";
        let cnt = 1;

        res += "|";
        for (let i = 0; i < col; i++) {
            res += `  \${${cnt}}  |`;
            cnt++;
        }
        res += `\n`;

        res += `|`;
        for (let i = 0; i < col; i++) {
            res += ` --- |`;
        }
        res += `\n`;
        row--;

        for (let i = 0; i < row; i++) {
            res += `|`;
            for (let i = 0; i < col; i++) {
                res += `  \${${cnt}}  |`;
                cnt++;
            }
            res += `\n`;
        }
        return new SnippetString(res);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "container" })
class Container extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`::: ${replacement}\n$0\n:::`);
    }
}

@EnablePostfixSuggestion({ language: "markdown", label: "codeblock" })
class CodeBlock extends PostfixHandler {
    private static readonly LANGUAGES = [
        "c",
        "abnf",
        "accesslog",
        "actionscript",
        "ada",
        "apache",
        "applescript",
        "arduino",
        "armasm",
        "asciidoc",
        "aspectj",
        "autohotkey",
        "autoit",
        "avrasm",
        "awk",
        "axapta",
        "bash",
        "basic",
        "bnf",
        "brainfuck",
        "cal",
        "capnproto",
        "ceylon",
        "clean",
        "clojure",
        "clojure-repl",
        "cmake",
        "coffeescript",
        "coq",
        "cos",
        "cpp",
        "crmsh",
        "crystal",
        "cs",
        "c#",
        "csharp",
        "csp",
        "css",
        "d",
        "dart",
        "delphi",
        "diff",
        "django",
        "dns",
        "dockerfile",
        "dos",
        "dsconfig",
        "dts",
        "dust",
        "ebnf",
        "elixir",
        "elm",
        "erb",
        "erlang",
        "erlang-repl",
        "excel",
        "fix",
        "flix",
        "fortran",
        "fsharp",
        "gams",
        "gauss",
        "gcode",
        "gherkin",
        "glsl",
        "go",
        "golang",
        "golo",
        "gradle",
        "groovy",
        "haml",
        "handlebars",
        "haskell",
        "haxe",
        "hsp",
        "htmlbars",
        "http",
        "hy",
        "inform7",
        "ini",
        "irpf90",
        "java",
        "javascript",
        "js",
        "json",
        "julia",
        "kotlin",
        "lasso",
        "ldif",
        "leaf",
        "less",
        "lisp",
        "livecodeserver",
        "livescript",
        "llvm",
        "lsl",
        "lua",
        "makefile",
        "markdown",
        "mathematica",
        "matlab",
        "maxima",
        "mel",
        "mercury",
        "mipsasm",
        "mizar",
        "mojolicious",
        "monkey",
        "moonscript",
        "n1ql",
        "nginx",
        "nimrod",
        "nix",
        "nsis",
        "objectivec",
        "ocaml",
        "openscad",
        "oxygene",
        "parser3",
        "perl",
        "pf",
        "php",
        "pony",
        "powershell",
        "processing",
        "profile",
        "prolog",
        "protobuf",
        "puppet",
        "purebasic",
        "py",
        "python",
        "q",
        "qml",
        "r",
        "rib",
        "roboconf",
        "rsl",
        "ruby",
        "ruleslanguage",
        "rust",
        "scala",
        "scheme",
        "scilab",
        "scss",
        "smali",
        "smalltalk",
        "sml",
        "sqf",
        "sql",
        "stan",
        "stata",
        "step21",
        "stylus",
        "subunit",
        "swift",
        "taggerscript",
        "tap",
        "tcl",
        "tex",
        "toml",
        "thrift",
        "tp",
        "twig",
        "ts",
        "typescript",
        "vala",
        "vbnet",
        "vbscript",
        "vbscript-html",
        "verilog",
        "vhdl",
        "vim",
        "x86asm",
        "xl",
        "xml",
        "xquery",
        "yml",
        "yaml",
        "zephir",
    ];
    private static readonly SET = new Set<String>(CodeBlock.LANGUAGES);

    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        if (CodeBlock.SET.has(replacement)) {
            return new SnippetString("```" + replacement + "\n${0}\n```");
        }
        return null;
    }
}
