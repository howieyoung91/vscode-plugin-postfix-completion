import PostfixHandler from "../../base/PostfixHandler";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Source } from "../../base/decorator/Source";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";

@EnablePostfixSuggestion({ language: "c", label: "test" })
export default class TestPostfixHandler extends PostfixHandler {
    // @Source.DocumentBetween({
    //     startLineNumber: 0,
    //     endLineNumber: 5,
    //     limit: 2,
    // })
    @Source.Document()
    // @Source.LineTextAt(0)
    @Target.Slice({})
    @Return.Replace()
    handleLineText(lineText: string, data: {}): string {
        return lineText;
    }
}
