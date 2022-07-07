/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../base/suggest/PostfixHandler";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Target } from "../../base/decorator/Target";

@EnablePostfixSuggestion({ language: "csharp", label: "cw" })
class CwPostfixHandler extends PostfixHandler {
    @Target.Slice({})
    handleTarget(replacement: string, data: {}) {
        let res = { text: null, deleteText: null };
        // 判断是否为空
        if (replacement.length === 0) {
            res.text = new SnippetString(`Console.WriteLine($1);`);
        } else {
            res.text = new SnippetString(`Console.WriteLine(${replacement});`);
            res.deleteText = { startIndex: data["startIndex"], endIndex: data["endIndex"] + 1 };
        }
        return res;
    }
}
