import { SnippetString } from "vscode";
import StringUtil from "../../util/StringUtil";
import { indent } from "../../util/DocumentUtil";
import { Target } from "../../base/decorator/Target";
import { Return } from "../../base/decorator/Return";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import PostfixHandler from "../../base/suggest/PostfixHandler";

@EnablePostfixSuggestion({ language: "python", label: "for" })
class ForPostfixHandler4Py extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        let newText = "";
        let indentChars = indent();
        if (StringUtil.isInt(replacement)) {
            newText = `for \${1:i} in range(${replacement}):\n${indentChars}`;
        } else {
            newText = `for \${1:i} in ${replacement}:\n${indentChars}`;
        }
        return new SnippetString(newText);
    }
}
