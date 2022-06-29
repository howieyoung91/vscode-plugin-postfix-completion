import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "javascript", label: "fori" },
    { language: "typescript", label: "fori" },
    { language: "vue", label: "fori" },
    { language: "html", label: "fori" },
    { language: "javascriptreact", label: "fori" },
    { language: "typescriptreact", label: "fori" }
)
class ForiPostfixHandler4TsAndJs extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data) {
        data.startIndex++;
        return new SnippetString(`for (let \${1:i} = 0; \${1:i} < ${replacement.trim()}; \${1:i}++) {\n${indent()}$0\n}`);
    }
}
