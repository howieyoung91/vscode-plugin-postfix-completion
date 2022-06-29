import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "javascript", label: "forof" },
    { language: "typescript", label: "forof" },
    { language: "vue", label: "forof" },
    { language: "html", label: "forof" },
    { language: "javascriptreact", label: "forof" },
    { language: "typescriptreact", label: "forof" }
)
class ForofPostfixHandler extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data: any) {
        data.startIndex++;
        return new SnippetString(`for (const \${1:item} of ${replacement.trim()}){\n${indent()}$0\n}`);
    }
}
