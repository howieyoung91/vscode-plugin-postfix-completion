import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "javascript", label: "undefined" },
    { language: "typescript", label: "undefined" },
    { language: "vue", label: "undefined" },
    { language: "html", label: "undefined" },
    { language: "javascriptreact", label: "undefined" },
    { language: "typescriptreact", label: "undefined" }
)
class UndefinedPostfixHandler4TsJs extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return new SnippetString(`if (${replacement} === undefined) {\n${indent()}$0\n}`);
    }
}
