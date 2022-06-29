import { CancellationToken, CompletionContext, Position, SnippetString, TextDocument, TextLine } from "vscode";
import TextEditUtil from "../util/TextEditUtil";
import PostfixSuggestion from "./PostfixSuggestion";
import TargetHandleResult from "./TargetHandleResult";
import PostfixHandler from "./PostfixHandler";
import PostfixSuggestionProvider from "./PostfixSuggestionProvider";

/**
 * 后缀补全提供器
 */
export default class DefaultPostfixSuggestionProvider extends PostfixSuggestionProvider {
    protected suggestions: PostfixSuggestion[] = [];

    constructor(language: string) {
        super();
        this._language = language;
        this._triggerCharacters = [`.`];
    }

    protected _triggerCharacters: string[];

    get triggerCharacters(): string[] {
        return this._triggerCharacters;
    }

    protected _language: string | null = null;

    get language(): string | null {
        return this._language;
    }

    public push(suggestion: PostfixSuggestion, ...suggestions: PostfixSuggestion[]): DefaultPostfixSuggestionProvider {
        this.suggestions.push(suggestion, ...suggestions);
        return this;
    }

    /**
     * 提供后缀补全建议
     */
    provide(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): PostfixSuggestion[] {
        let candidates: PostfixSuggestion[] = [];
        for (const suggestion of this.suggestions) {
            // 设置参数
            let postfixHandler = suggestion.postfixHandler;
            suggestion.data.add({ document, position, token, context });

            // 初始化参数
            postfixHandler.initArgs(suggestion.data.store);

            let { line, lineText } = this.getLineText(document, position);
            let result = this.handleLineText(suggestion, line, postfixHandler, lineText);

            // 如果返回 null 则直接返回,不添加 item
            if (result === null) {
                continue;
            }

            const resultObject: { text; documentation; detail; addition; deleteText } = this.parseResult(result, suggestion);
            // 设置新的文本
            this.applyPropertyValues(resultObject, suggestion, position);
            // 处理补全项
            postfixHandler.handleCompletionItem(suggestion, suggestion.data.store);
            // 重置参数
            suggestion.data.clear();
            // 添加补全建议
            candidates.push(suggestion);
        }
        return candidates;
    }

    private applyPropertyValues(
        resultObject: { text: any; documentation: any; detail: any; addition: any; deleteText: any },
        postfix: PostfixSuggestion,
        position: Position
    ) {
        if (resultObject.text) {
            postfix.insertText = resultObject.text;
        }
        // 设置新的详情
        if (resultObject.detail) {
            postfix.detail = resultObject.detail;
        } else {
            // 默认为 postfix
            postfix.detail = `postfix`;
        }
        // 设置新的文档
        if (resultObject.documentation) {
            postfix.documentation = resultObject.documentation;
        } else {
            if (resultObject.text instanceof SnippetString) {
                // 如果是Snippet
                postfix.documentation = resultObject.text.value;
            } else {
                // 如果是string
                postfix.documentation = resultObject.text;
            }
        }
        // 添加参数
        // if (resultObject.addition) {
        //   postfix.data.addData(resultObject.addition);
        // }
        // 是否删除原有文本
        if (resultObject.deleteText) {
            postfix.additionalTextEdits = [
                TextEditUtil.ATextEditToDeleteBetween(position.line, resultObject.deleteText.startIndex, resultObject.deleteText.endIndex),
            ];
        }
    }

    private parseResult(result: string | SnippetString | TargetHandleResult, postfix: PostfixSuggestion) {
        let text: string | SnippetString | undefined = undefined;
        let documentation: string | undefined = undefined;
        let detail: string | undefined = undefined;
        let addition: object | undefined = undefined;
        let deleteText: { startIndex; endIndex } | undefined = undefined;

        switch (typeof result) {
            case "object":
                if (result instanceof SnippetString) {
                    text = result;
                } else {
                    text = result.text;
                    documentation = result.documentation;
                    detail = result.detail;
                    // postfix.data.setData(addition);
                    // data = result.data;
                    deleteText = result.deleteText;
                }
                break;
            case "string":
                text = result;
                break;
        }
        return { text, documentation, detail, addition, deleteText };
    }

    private handleLineText(postfix: PostfixSuggestion, line: TextLine, postfixHandler: PostfixHandler, lineText: string) {
        // 把 firstNotWhiteSpaceIndex 放入 data
        postfix.data.add({ firstNotWhiteSpaceIndex: line.firstNonWhitespaceCharacterIndex });
        // postfixHandler 处理行文本
        return postfixHandler.handleLineText(lineText, postfix.data.store);
    }

    private getLineText(document: TextDocument, position: Position) {
        // 获取行文本
        const line: TextLine = document.lineAt(position);
        let lineText: string = line.text.substring(0, position.character);
        return { line, lineText };
    }
}
