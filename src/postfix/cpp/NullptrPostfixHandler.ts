import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "cpp", label: "nullptr" })
class NullptrPostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice()
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        return new SnippetString(`if (${replacement} == nullptr) {\n${indent()}$0\n}`);
    }
}
