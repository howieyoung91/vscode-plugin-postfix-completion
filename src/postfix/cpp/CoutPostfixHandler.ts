import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";
import LineTextHandleResult from "../../base/LinetextHandleResult";

@PostfixHandler({ language: "cpp", label: "cout" })
class CoutPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Interval({ end: "." })
  handleLineText(replacement: string, datas: {}): LineTextHandleResult {
    const newText = `std::cout << ${replacement} << std::endl;`;
    return {
      text: new SnippetString(newText),
      deleteText: {
        startIndex: datas["startIndex"],
        endIndex: datas["endIndex"] + 1,
      },
    };
  }
}
