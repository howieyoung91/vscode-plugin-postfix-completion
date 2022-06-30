/**
 * 后缀补全建议请求
 */
export default class PostfixSuggestionRequest {
    protected _attributes: any = {};

    get attributes(): any {
        return this._attributes;
    }

    public setAttributes(data: {}): PostfixSuggestionRequest {
        this._attributes = Object.assign(data, this._attributes);
        return this;
    }

    public getAttribute(key: string) {
        return this._attributes[key];
    }

    public setAttribute(key: string, value: any) {
        this._attributes[key] = value;
        return this;
    }

    public clearAttributes() {
        this._attributes = {};
    }
}
