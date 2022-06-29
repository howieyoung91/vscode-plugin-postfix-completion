import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "cpp", label: "struct" }, { language: "c", label: "struct" })
class StructPostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        data["startIndex"]++;
        return new SnippetString(`struct ${replacement.trim()} {\n${indent()}$0\n}`);
    }
}
