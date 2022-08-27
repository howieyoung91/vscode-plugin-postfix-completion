/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { PostfixHandler } from "../../base/suggest/PostfixHandler";
import { Filter } from "../../base/decorator/Filter";
import { Return } from "../../base/decorator/Return";
import { indent } from "../../util/DocumentUtil";
import StringUtil from "../../util/StringUtil";
import { SnippetString } from "vscode";

@EnablePostfixSuggestion({ language: "python", label: "for" })
class For extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        let newText = "";
        let indentChars = indent();
        if (StringUtil.isInt(replacement)) {
            newText = `for \${1:i} in range(${replacement}):\n${indentChars}`;
        } else {
            newText = `for \${1:i} in ${replacement}:\n${indentChars}`;
        }
        return new SnippetString(newText);
    }
}

@EnablePostfixSuggestion({ language: "python", label: "if" })
class If extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `if ${replacement}:\n${indent()}`;
    }
}

@EnablePostfixSuggestion({ language: "python", label: "matrix" })
class Matrix extends PostfixHandler {
    @Filter.Slice()
    @Filter.Validation.Contains(/[0-9]+.?[0-9]*(\s+[0-9]+.?[0-9]*)+\s*$/)
    @Return.Replace()
    handleTarget(replacement: string) {
        // 分割空格,找到数据
        let nums = replacement.split(/\s+/);
        // 如果行和列不是整数
        if (!StringUtil.isInt(nums[nums.length - 1]) || !StringUtil.isInt(nums[nums.length - 2])) {
            return null;
        }
        // 获取矩阵行和列
        const maxRow = Number(nums[nums.length - 2]);
        const maxCol = Number(nums[nums.length - 1]);
        // 获取提供的数据的个数
        let realLength = nums.length - 2;
        // 如果数据长度小于2 或者maxCol maxRow任意一个小于8(最大只能8*8) 或者提供的数的个数与矩阵大小不匹配,则不予补全
        if (nums.length < 2 || maxCol > 8 || maxRow > 8 || maxRow * maxCol !== nums.length - 2) {
            return null;
        }
        // 生成矩阵的行和列
        let rowAndCol = ``;
        for (let row = 0; row < maxRow; row++) {
            let temp = `${indent()}[`;
            for (let col = 0; col < maxCol; col++) {
                let index = row * maxCol + col;
                if (index >= realLength) {
                    break;
                }
                temp += `${nums[index]},`;
            }
            // 删除逗号
            temp = temp.substring(0, temp.length - 1);
            // 补全方括号
            temp += `],\n`;
            rowAndCol += temp;
        }
        return `[\n${rowAndCol}]`;
    }
}

@EnablePostfixSuggestion({ language: "python", label: "none" })
class None extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `if ${replacement} is None:\n${indent()}`;
    }
}

// @EnablePostfixSuggestion({ language: "python", label: "not" })
// class Not extends PostfixHandler {
//     @Filter.Slice({ start: " " })
//     @Return.Replace()
//     handleTarget(replacement: string, data: any) {
//         data.startIndex++;
//         return `not ${replacement.trim()}`;
//     }
// }

@EnablePostfixSuggestion({ language: "python", label: "notnone" })
class NotNone extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `if ${replacement} is not None:\n${indent()}`;
    }
}

@EnablePostfixSuggestion({ language: "python", label: "print" })
class Print extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return `print(${replacement})`;
    }
}

@EnablePostfixSuggestion({ language: "python", label: "var" })
class Var extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`\${1:varName} = ${replacement}`);
    }
}

@EnablePostfixSuggestion({ language: "python", label: "while" })
class While extends PostfixHandler {
    @Filter.Slice()
    @Return.Replace()
    handleTarget(replacement: string) {
        return new SnippetString(`while ${replacement}:\n${indent()}`);
    }
}
