import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "markdown", label: "h6" })
class H6PostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return new SnippetString(`###### ${replacement}`);
    }
}
