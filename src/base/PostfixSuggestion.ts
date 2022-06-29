import PostfixHandler from "./PostfixHandler";
import { CompletionItem, CompletionItemKind } from "vscode";
import Store from "./Store";

/**
 * 后缀补全基类
 */
export default class PostfixSuggestion extends CompletionItem {
    constructor(label: string, postfixHandler: PostfixHandler) {
        super(label, CompletionItemKind.Snippet);
        this._postfixHandler = postfixHandler;
    }

    protected _postfixHandler: PostfixHandler;

    public static of(label: string, handler: PostfixHandler) {
        return new PostfixSuggestion(label, handler);
    }

    get postfixHandler(): PostfixHandler {
        return this._postfixHandler;
    }

    set postfixHandler(value: PostfixHandler) {
        this._postfixHandler = value;
    }

    protected _data: Store = new Store();

    get data(): Store {
        return this._data;
    }

    set data(value: Store) {
        this._data = value;
    }
}
