import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "cpp", label: "include" }, { language: "c", label: "include" })
class IncludePostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data: any) {
        data.startIndex++;
        return `#include "${replacement.trim()}"`;
    }
}
