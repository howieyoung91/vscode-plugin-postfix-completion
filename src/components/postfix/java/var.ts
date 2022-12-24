/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import { PostfixHandler } from "../../../base/support/PostfixHandler";
import { Return } from "../../../base/decorator/Return";
import { Filter } from "../../../base/decorator/Filter";
import { EnablePostfixSuggestion } from "../../../base/decorator/Enable";
import { HandleResult } from "../../../base/support/PostfixHandler";
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
        let end = replacement.indexOf("("); // new ArrayList<Integer>()
        if (end === -1) {
            // new Integer[]{1, 2} -> Integer[] integers = new Integer[]{1, 2};
            end = replacement.indexOf("[");
            let clazz = replacement.substring(4, end).trim();
            return new SnippetString(`${clazz}[] \${1:${clazz.toLowerCase()}s} = ${replacement};`);
        }
        let classWithType = replacement.substring(4, end).trim();
        let typeIndexInClazz = classWithType.indexOf("<");
        let clazz = classWithType;
        // 如果存在泛型 获取纯净的类名
        if (typeIndexInClazz !== -1) {
            // 去除泛型 得到纯净的类名
            clazz = classWithType.substring(0, typeIndexInClazz);
            replacement = replacement.substring(0, replacement.indexOf("<") + 1) + replacement.substring(replacement.lastIndexOf(">"));
        }
        return new SnippetString(`${classWithType} \${1:${clazz.toLowerCase()}} = ${replacement};`);
    }

    @Filter.Slice({})
    @Return.Replace()
    handleTarget(replacement: string): HandleResult {
        // 判断是否是 new ...(...)
        let newText = null;
        if (replacement.match(/^new (.+?)(\(.*\)|(\[.*](\{.*?})?))$/)) {
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
