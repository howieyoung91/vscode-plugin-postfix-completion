import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import LinetextHandleResult from "../../base/LinetextHandleResult";
import { PostfixHandler } from "../../base/decorator/PostfixHandler";
import DocumentUtil from "../../../util/DocumentUtil";
import StringUtil from "../../../util/StringUtil";

@PostfixHandler({ language: "python", label: "matrix" })
class MatrixPostfixHandler4Py extends BasePostfixHandler {
  handleLineText(lineText: string): LinetextHandleResult | null {
    let endIndex = lineText.lastIndexOf(".");
    // 搜索目标字符串
    let startIndex = lineText.search(
      /[0-9]+.?[0-9]*(\s+[0-9]+.?[0-9]*)*\s*\.[matrix]{0,6}$/
    );
    if (startIndex === -1) {
      return null;
    }
    // 找到需要替换的部分
    let replacement = lineText.substring(startIndex, endIndex).trim();
    // 分割空格,找到数据
    let nums = replacement.split(/\s+/);
    // 如果行和列不是整数
    if (
      !StringUtil.isInt(nums[nums.length - 1]) ||
      !StringUtil.isInt(nums[nums.length - 2])
    ) {
      return null;
    }
    // 获取矩阵行和列
    const maxRow = Number(nums[nums.length - 2]);
    const maxCol = Number(nums[nums.length - 1]);
    // 获取提供的数据的个数
    let realLength = nums.length - 2;
    // 如果数据长度小于2 或者maxCol maxRow任意一个小于8(最大只能8*8) 或者提供的数的个数与矩阵大小不匹配,则不予补全
    if (
      nums.length < 2 ||
      maxCol > 8 ||
      maxRow > 8 ||
      maxRow * maxCol !== nums.length - 2
    ) {
      return null;
    }
    // 生成矩阵的行和列
    let rowAndCol = ``;
    for (let row = 0; row < maxRow; row++) {
      let temp = `${DocumentUtil.indentCharacters()}[`;
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
      // console.log(temp);
    }
    const newText = `[\n${rowAndCol}]`;
    return {
      text: new SnippetString(newText),
      detail: "postfix",
      documentation: newText,
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
