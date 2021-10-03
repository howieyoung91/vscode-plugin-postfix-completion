import { SnippetString } from "vscode";
import BasePostfixHandler from "../../base/BasePostfixHandler";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import { PostfixHandler } from "../../base/ioc/decorator/PostfixHandler";

@PostfixHandler({ language: "cpp", label: "cout" })
class CoutPostfixHandler4Cpp extends BasePostfixHandler {
  @Target.Slice({ end: "." })
  @Return.DeleteText()
  handleLineText(replacement: string, datas: {}) {
    return new SnippetString(`std::cout << ${replacement} << std::endl;`);
  }
}
