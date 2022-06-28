import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";
import { Return } from "../../base/decorator/Return";

@PostfixHandler({ language: "go", label: "struct" })
class StructPostfixHandler4Go extends BasePostfixHandler {
    @Target.Slice({})
    @Return.Replace()
    handleLineText(replacement: string) {
        const newText = `type ${replacement} struct {\n${indent()}$0\n}`;
        return new SnippetString(newText);
    }
}
