import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "javascript", label: "notnull" },
    { language: "typescript", label: "notnull" },
    { language: "vue", label: "notnull" },
    { language: "html", label: "notnull" },
    { language: "javascriptreact", label: "notnull" },
    { language: "typescriptreact", label: "notnull" }
)
class NotNullPostfixHandler4TsJs extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return new SnippetString(`if (${replacement} !== null) {\n${indent()}$0\n}`);
    }
}
