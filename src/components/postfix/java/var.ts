/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import PostfixHandler from "../../../base/suggest/PostfixHandler";
import { Return } from "../../../base/decorator/Return";
import { Target } from "../../../base/decorator/Target";
import { EnablePostfixSuggestion } from "../../../base/decorator/EnablePostfixSuggestion";
import TargetHandleResult from "../../../base/suggest/TargetHandleResult";
import StringUtil from "../../../util/StringUtil";

@EnablePostfixSuggestion({ language: "java", label: "var" })
class Var extends PostfixHandler {
    private static handleSimpleType(replacement: string) {
        let type = StringUtil.javaTypeOf(replacement);
        if (type === null) {
            return null;
        }
        return new SnippetString(`${type} \${1:varName} = ${replacement};`);
    }

    private static handleNew(replacement: string) {
        // 获取带泛型的类名
        let classWithType = replacement.substring(4, replacement.indexOf("(")).trim();
        // 纯净的类名
        let clazz = classWithType;
        let typeIndexInClazz = classWithType.indexOf("<");
        // 如果存在泛型
        // 获取纯净的类名
        if (typeIndexInClazz !== -1) {
            // 去除泛型
            clazz = classWithType.substring(0, typeIndexInClazz);
            replacement = replacement.substring(0, replacement.indexOf("<") + 1) + replacement.substring(replacement.lastIndexOf(">"));
        }
        return new SnippetString(`${classWithType} \${1:${clazz.toLowerCase()}} = ${replacement};`);
    }

    @Target.Slice({})
    @Return.Replace()
    handleTarget(replacement: string): null | TargetHandleResult {
        // 判断是否是 new ...(...)
        let newText = null;
        if (replacement.match(/^new (.+?)\(.*\)$/)) {
            newText = Var.handleNew(replacement);
        } else {
            newText = Var.handleSimpleType(replacement);
        }
        if (newText === null) {
            return null;
        }
        return newText;
    }
}
