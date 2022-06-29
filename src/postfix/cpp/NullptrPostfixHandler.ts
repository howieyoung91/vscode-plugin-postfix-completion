import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "cpp", label: "nullptr" })
class NullptrPostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice()
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        return new SnippetString(`if (${replacement} == nullptr) {\n${indent()}$0\n}`);
    }
}
