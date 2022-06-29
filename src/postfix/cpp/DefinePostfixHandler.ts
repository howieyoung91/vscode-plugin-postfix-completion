import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "cpp", label: "define" }, { language: "c", label: "define" })
class DefinePostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data) {
        data.startIndex++;
        return `#define ${replacement.trim()} `;
    }
}
