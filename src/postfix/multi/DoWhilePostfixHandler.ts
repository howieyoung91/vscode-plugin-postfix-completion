import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { indent } from "../../util/DocumentUtil";

@EnablePostfixSuggestion(
    { language: "java", label: "dowhile" },
    { language: "c", label: "dowhile" },
    { language: "cpp", label: "dowhile" },
    { language: "csharp", label: "dowhile" },
    { language: "js", label: "dowhile" },
    { language: "ts", label: "dowhile" },
    { language: "javascriptreact", label: "dowhile" },
    { language: "typescriptreact", label: "dowhile" },
    { language: "vue", label: "dowhile" },
    { language: "html", label: "dowhile" }
)
class DoWhilePostfixHandler extends PostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleTarget(replacement: string, data: {}) {
        data["startIndex"]++;
        return new SnippetString(`do {\n${indent()}\$0\n} while(${replacement});`);
    }
}
