import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { indent } from "../../util/DocumentUtil";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "cpp", label: "notnullptr" })
class NotnullptrPostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        const newText = `if (${replacement} != nullptr) {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}
