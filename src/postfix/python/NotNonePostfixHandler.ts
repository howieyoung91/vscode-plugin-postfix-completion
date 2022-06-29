import PostfixHandler from "../../base/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion({ language: "python", label: "notnone" })
class NotNonePostfixHandler4Py extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        return `if ${replacement} is not None:\n${indent()}`;
    }
}
