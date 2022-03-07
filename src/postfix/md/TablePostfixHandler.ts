import {SnippetString} from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import {PostfixHandler} from "../../base/decorator/PostfixHandler";
import {Target} from "../../base/decorator/Target";
import {Return} from "../../base/decorator/Return";

@PostfixHandler({language: "markdown", label: "table"})
class TablePostfixHandler extends BasePostfixHandler {
  @Target.Regex.Search(/[0-9]+\s+[0-9]+./)
  @Return.Replace()
  handleLineText(replacement: string, datas: {}) {
    // 分割空格,找到数据
    let nums = replacement.split(/\s+/);
    // 如果行和列不是整数
    let row = Number(nums[nums.length - 2]);
    let col = Number(nums[nums.length - 1]);
    if (row == 0 || col == 0) {
      return null;
    }
    let res = "";
    let cnt = 1;

    res += "|";
    for (let i = 0; i < col; i++) {
      res += `  \${${cnt}}  |`;
      cnt++;
    }
    res += `\n`;

    res += `|`;
    for (let i = 0; i < col; i++) {
      res += ` --- |`;
    }
    res += `\n`;
    row--;

    for (let i = 0; i < row; i++) {
      res += `|`;
      for (let i = 0; i < col; i++) {
        res += `  \${${cnt}}  |`;
        cnt++;
      }
      res += `\n`;
    }
    return new SnippetString(res);
  }
}
