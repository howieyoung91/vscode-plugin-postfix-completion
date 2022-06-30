import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@EnablePostfixSuggestion({ language: "c", label: "null" })
class NullPostfixHandler4C extends PostfixHandler {
    @Target.Slice({ end: "." })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        return new SnippetString(`if (${replacement} == NULL) {\n${indent()}$0\n}`);
    }
}
