import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "cpp", label: "nullptr" })
class NullptrPostfixHandler4Cpp extends BasePostfixHandler {
    @Target.Slice()
    @Return.Replace()
    handleLineText(replacement: string, data: {}) {
        return new SnippetString(
            `if (${replacement} == nullptr) {\n${indent()}$0\n}`
        );
    }
}
