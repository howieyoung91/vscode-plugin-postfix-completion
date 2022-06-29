import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion(
    { language: "javascript", label: "log" },
    { language: "typescript", label: "log" },
    { language: "vue", label: "log" },
    { language: "html", label: "log" },
    { language: "javascriptreact", label: "log" },
    { language: "typescriptreact", label: "log" }
)
class LogPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return `console.log(${replacement});`;
    }
}
