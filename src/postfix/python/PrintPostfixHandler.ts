import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "python", label: "print" })
class PrintPostfixHandler4Py extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return `print(${replacement})`;
    }
}
