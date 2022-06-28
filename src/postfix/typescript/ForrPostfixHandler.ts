import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
    { language: "javascript", label: "forr" },
    { language: "typescript", label: "forr" },
    { language: "vue", label: "forr" },
    { language: "html", label: "forr" },
    { language: "javascriptreact", label: "forr" },
    { language: "typescriptreact", label: "forr" }
)
class ForrPostfixHandler extends BasePostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data: any) {
        data.startIndex++;
        return new SnippetString(
            `for (let \${1:i} = ${replacement.trim()}; \${1:i} >= 0; \${1:i}--) {\n${indent()}$0\n}`
        );
    }
}
