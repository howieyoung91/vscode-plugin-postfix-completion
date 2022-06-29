import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "java", label: "if" },
    { language: "c", label: "if" },
    { language: "cpp", label: "if" },
    { language: "csharp", label: "if" },
    { language: "javascript", label: "if" },
    { language: "typescript", label: "if" },
    { language: "vue", label: "if" },
    { language: "html", label: "if" }
)
class IfPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return new SnippetString(`if (${replacement}) {\n${indent()}$0\n}`);
    }
}
