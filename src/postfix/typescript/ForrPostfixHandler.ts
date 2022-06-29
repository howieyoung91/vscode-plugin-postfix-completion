import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "javascript", label: "forr" },
    { language: "typescript", label: "forr" },
    { language: "vue", label: "forr" },
    { language: "html", label: "forr" },
    { language: "javascriptreact", label: "forr" },
    { language: "typescriptreact", label: "forr" }
)
class ForrPostfixHandler extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data: any) {
        data.startIndex++;
        return new SnippetString(`for (let \${1:i} = ${replacement.trim()}; \${1:i} >= 0; \${1:i}--) {\n${indent()}$0\n}`);
    }
}
