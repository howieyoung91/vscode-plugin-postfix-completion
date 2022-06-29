import PostfixHandler from "../../base/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "go", label: "println" })
class PrintlnPostfixHandler4Go extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return `fmt.Println(${replacement})`;
    }
}
