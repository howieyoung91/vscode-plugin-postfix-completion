import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";

@PostfixHandler(
    { language: "javascript", label: "warn" },
    { language: "typescript", label: "warn" },
    { language: "vue", label: "warn" },
    { language: "html", label: "warn" },
    { language: "javascriptreact", label: "warn" },
    { language: "typescriptreact", label: "warn" }
)
class WarnPostfixHandler extends BasePostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        return `console.warn(${replacement});`;
    }
}
