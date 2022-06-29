import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "python", label: "return" }, { language: "go", label: "return" })
class ReturnPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return `return ${replacement}`;
    }
}
