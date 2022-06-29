import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion(
    { language: "javascript", label: "err" },
    { language: "typescript", label: "err" },
    { language: "vue", label: "err" },
    { language: "html", label: "err" },
    { language: "javascriptreact", label: "err" },
    { language: "typescriptreact", label: "err" }
)
class ErrorPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return `console.error(${replacement});`;
    }
}
