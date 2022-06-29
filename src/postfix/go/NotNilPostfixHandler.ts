import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "go", label: "notnil" })
class NotNilPostfixHandler4Go extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return new SnippetString(`if ${replacement} != nil {\n${indent()}$0\n}`);
    }
}
