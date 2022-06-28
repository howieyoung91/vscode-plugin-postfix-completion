import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
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
class DoWhilePostfixHandler extends BasePostfixHandler {
    @Target.Slice({ start: " " })
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        data["startIndex"]++;
        return new SnippetString(`do {\n${indent()}\$0\n} while(${replacement});`);
    }
}
