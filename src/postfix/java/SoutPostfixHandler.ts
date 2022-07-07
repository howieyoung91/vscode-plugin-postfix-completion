/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { Target } from "../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import TargetHandleResult from "../../base/suggest/TargetHandleResult";

@EnablePostfixSuggestion({ language: "java", label: "sout" })
class SoutPostfixHandler4J extends PostfixHandler {
    @Target.Slice({})
    handleTarget(replacement: string, data: {}): TargetHandleResult {
        let res = { text: null, deleteText: null };
        // 判断是否为空
        if (replacement.length === 0) {
            res.text = new SnippetString(`System.out.println($1);`);
        } else {
            res.text = new SnippetString(`System.out.println(${replacement});`);
            res.deleteText = { startIndex: data["startIndex"], endIndex: data["endIndex"] + 1 };
        }
        return res;
    }
}
