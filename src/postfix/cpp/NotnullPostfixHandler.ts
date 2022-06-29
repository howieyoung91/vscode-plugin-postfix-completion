import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "c", label: "notnull" })
class NotnullPostfixHandler4C extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        const newText = `if (${replacement} != NULL) {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}
