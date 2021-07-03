import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import { indent } from "../../util/DocumentUtil";

@PostfixHandler(
  { language: "javascript", label: "fori" },
  { language: "typescript", label: "fori" },
  { language: "vue", label: "fori" },
  { language: "html", label: "fori" }
)
class ForiPostfixHandler4TsAndJs extends BasePostfixHandler {
  handleLineText(replacement: string, datas) {
    datas.startIndex++;
    return new SnippetString(
      `for (let \${1:i} = 0; \${1:i} < ${replacement}; \${1:i}++) {\n${indent()}$2\n}`
    );
  }
}
