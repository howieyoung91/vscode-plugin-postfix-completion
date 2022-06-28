import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
    { language: "javascript", label: "cast" },
    { language: "typescript", label: "cast" },
    { language: "vue", label: "cast" },
    { language: "html", label: "cast" },
    { language: "javascriptreact", label: "cast" },
    { language: "typescriptreact", label: "cast" }
)
class CastPostfixHandler extends BasePostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data: any) {
        data.startIndex++;
        return new SnippetString(`(<\${1:type}> ${replacement.trim()})`);
    }
}
