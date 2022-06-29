import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "go", label: "interface" })
class InterfacePostfixHandler4Go extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string): SnippetString {
        return new SnippetString(`type ${replacement} interface {\n${indent()}$0\n}`);
    }
}
