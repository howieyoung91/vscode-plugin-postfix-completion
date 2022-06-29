import PostfixHandler from "../../base/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "java", label: "assert" })
class AssertPostfixHandler4J extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return `assert ${replacement};`;
    }
}
