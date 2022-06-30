import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Return } from "../../base/decorator/Return";
import { indent } from "../../util/DocumentUtil";
import { SnippetString } from "vscode";

@EnablePostfixSuggestion({ language: "java", label: "instanceof" })
class InstanceofPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`if (${replacement} instanceof $1) {\n${indent()}$0\n}`);
    }
}
