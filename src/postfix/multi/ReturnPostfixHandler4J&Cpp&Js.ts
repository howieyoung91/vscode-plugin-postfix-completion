import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
    { language: "java", label: "return" },
    { language: "c", label: "return" },
    { language: "cpp", label: "return" },
    { language: "csharp", label: "return" },
    { language: "javascript", label: "return" },
    { language: "typescript", label: "return" },
    { language: "vue", label: "return" },
    { language: "html", label: "return" }
)
class ReturnPostfixHandler extends BasePostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        return `return ${replacement};`;
    }
}
