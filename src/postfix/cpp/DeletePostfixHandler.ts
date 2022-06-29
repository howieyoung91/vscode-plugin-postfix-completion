import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "cpp", label: "delete" }, { language: "c", label: "delete" })
class DeletePostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data) {
        data.startIndex++;
        return `delete ${replacement.trim().trimEnd()};`;
    }
}
