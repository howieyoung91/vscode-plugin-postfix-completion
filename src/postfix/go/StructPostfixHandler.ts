import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "go", label: "struct" })
class StructPostfixHandler4Go extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        const newText = `type ${replacement} struct {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}
