import PostfixHandler from "../../base/PostfixHandler";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";

@EnablePostfixSuggestion({ language: "cpp", label: "ptr" }, { language: "c", label: "ptr" })
class PtrPostfixHandler4Cpp extends PostfixHandler {
    @Target.Regex.Match({ regex: /\s*[a-zA-Z_][a-zA-Z_0-9]*$/, start: " ", end: "." })
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        data["startIndex"]++;
        return `*${replacement.trim()}`;
    }
}
