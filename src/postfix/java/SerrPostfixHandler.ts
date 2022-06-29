import { SnippetString } from "vscode";
import PostfixHandler from "../../base/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import TargetHandleResult from "../../base/TargetHandleResult";

@EnablePostfixSuggestion({ language: "java", label: "serr" })
class SerrPostfixHandler4J extends PostfixHandler {
    @Target.Slice({})
    handleLineText(replacement: string, data: {}): TargetHandleResult {
        let res = { text: null, deleteText: null };
        // 判断是否为空
        if (replacement.length === 0) {
            res.text = new SnippetString(`System.err.println($1);`);
        } else {
            res.text = new SnippetString(`System.err.println(${replacement});`);
            res.deleteText = { startIndex: data["startIndex"], endIndex: data["endIndex"] + 1 };
        }
        return res;
    }
}
