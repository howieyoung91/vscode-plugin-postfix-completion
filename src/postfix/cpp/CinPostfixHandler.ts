import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";

@EnablePostfixSuggestion({ language: "cpp", label: "cin" })
export class CinPostfixHandler4Cpp extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        return `std::cin >> ${replacement};`;
    }
}
