import { CancellationToken, CompletionContext, Position, SnippetString, TextDocument } from "vscode";
import TextEditUtil from "../../../util/TextEditUtil";
import PostfixSuggestion from "../PostfixSuggestion";
import TargetHandleResult from "../TargetHandleResult";
import DocumentUtil from "../../../util/DocumentUtil";
import LanguageSupportPostfixSuggestionProvider from "./LanguageSupportPostfixSuggestionProvider";

/**
 * 后缀补全提供器
 */
export default class DefaultPostfixSuggestionProvider extends LanguageSupportPostfixSuggestionProvider {
    /**
     * 提供后缀补全建议
     */
    provide(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): PostfixSuggestion[] {
        let candidates: PostfixSuggestion[] = [];
        for (const suggestion of this.suggestions) {
            // 设置参数
            suggestion.request.setAttributes({ document, position, token, context });

            // 初始化参数
            suggestion.handler.initArgs(suggestion.request.attributes);

            const result = this.dispatch(suggestion, document, position);
            if (result === null) {
                continue;
            }

            // 设置新的文本
            this.applyPropertyValues(result, suggestion, position);

            // 重置参数
            suggestion.request.clearAttributes();
            // 添加补全建议
            candidates.push(suggestion);
        }
        return candidates;
    }

    /**
     * 分发请求到 suggestion
     * @param suggestion
     * @param document
     * @param position
     * @private
     */
    private dispatch(suggestion: PostfixSuggestion, document: TextDocument, position: Position) {
        const line = DocumentUtil.getTextLine(document, position);
        suggestion.request.setAttributes({ firstNotWhiteSpaceIndex: line.firstNonWhitespaceCharacterIndex });
        const lineText = line.text.substring(0, position.character);
        const result = suggestion.handler.handleTarget(lineText, suggestion.request.attributes);
        return this.resolveResult(result);
    }

    private applyPropertyValues(
        resultObject: { text: any; documentation: any; detail: any; addition: any; deleteText: any },
        suggestion: PostfixSuggestion,
        position: Position
    ) {
        if (resultObject.text) {
            suggestion.insertText = resultObject.text;
        }
        // 设置新的详情
        if (resultObject.detail) {
            suggestion.detail = resultObject.detail;
        } else {
            // 默认为 suggestion
            suggestion.detail = `postfix`;
        }
        // 设置新的文档
        if (resultObject.documentation) {
            suggestion.documentation = resultObject.documentation;
        } else {
            if (resultObject.text instanceof SnippetString) {
                // 如果是Snippet
                suggestion.documentation = resultObject.text.value;
            } else {
                // 如果是string
                suggestion.documentation = resultObject.text;
            }
        }
        // 添加参数
        // if (resultObject.addition) {
        //   suggestion.data.addData(resultObject.addition);
        // }
        // 是否删除原有文本
        if (resultObject.deleteText) {
            suggestion.additionalTextEdits = [
                TextEditUtil.ATextEditToDeleteBetween(position.line, resultObject.deleteText.startIndex, resultObject.deleteText.endIndex),
            ];
        }
    }

    private resolveResult(result: string | SnippetString | TargetHandleResult) {
        if (result == null) {
            return null;
        }
        let text: string | SnippetString | undefined = undefined;
        let documentation: string | undefined = undefined;
        let detail: string | undefined = undefined;
        let addition: object | undefined = undefined;
        let deleteText: { start; end } | undefined = undefined;

        switch (typeof result) {
            case "object":
                if (result instanceof SnippetString) {
                    text = result;
                } else {
                    text = result.text;
                    documentation = result.documentation;
                    detail = result.detail;
                    deleteText = result.deleteText;
                }
                break;
            case "string":
                text = result;
                break;
        }
        return { text, documentation, detail, addition, deleteText };
    }
}
