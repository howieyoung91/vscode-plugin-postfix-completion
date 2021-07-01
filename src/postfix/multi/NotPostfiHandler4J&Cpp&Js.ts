import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler(
  { language: "java", label: "not" },
  { language: "c", label: "not" },
  { language: "cpp", label: "not" },
  { language: "javascript", label: "not" },
  { language: "typescript", label: "not" },
  { language: "vue", label: "not" },
  { language: "html", label: "not" }
)
class NotPostfixHandler extends BasePostfixHandler {
  handleLineText(lineText: string): LineTextHandleResult {
    // 截取
    let startIndex = lineText.lastIndexOf(" ") + 1;
    let endIndex = lineText.lastIndexOf(".");
    // 需要替换的文本
    let replacement = lineText.substring(startIndex, endIndex).trimEnd();
    if (replacement.length === 0) {
      return null;
    }
    return {
      text: `!${replacement}`,
      deleteText: {
        startIndex,
        endIndex: endIndex + 1,
      },
    };
  }
}
