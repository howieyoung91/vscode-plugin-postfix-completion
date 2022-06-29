import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "python", label: "len" }, { language: "go", label: "len" })
class LenPostfixHandler extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data: any) {
        data.startIndex++;
        return `len(${replacement.trim()})`;
    }
}
