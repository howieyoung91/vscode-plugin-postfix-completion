import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion(
    { language: "java", label: "not" },
    { language: "c", label: "not" },
    { language: "cpp", label: "not" },
    { language: "csharp", label: "not" },
    { language: "javascript", label: "not" },
    { language: "typescript", label: "not" },
    { language: "vue", label: "not" },
    { language: "html", label: "not" }
)
class NotPostfixHandler extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data: any) {
        data.startIndex++;
        return `!${replacement.trim()}`;
    }
}
