import PostfixHandler from "../../base/suggest/PostfixHandler";
import { EnablePostfixSuggestion } from "../../base/decorator/EnablePostfixSuggestion";
import { Source } from "../../base/decorator/Source";
import { Return } from "../../base/decorator/Return";
import { Target } from "../../base/decorator/Target";
import PostfixSuggestionRequest from "../../base/suggest/PostfixSuggestionRequest";
import PostfixSuggestion from "../../base/suggest/PostfixSuggestion";

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
    handleTarget(lineText: string, data: {}): string {
        return lineText;
    }
}
