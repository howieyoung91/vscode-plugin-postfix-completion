/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

export interface Request {
    getAttribute(key: string): any;

    setAttributes(attributes: {}): this;

    setAttribute(key: string, value: any): this;

    clearAttributes(): void;
}

export abstract class AbstractRequest implements Request {
    protected _attributes: any = {};
    protected _target: string;

    getAttribute = (key: string) => this._attributes[key];

    setAttributes(attributes: {}): this {
        this._attributes = Object.assign(attributes, this._attributes);
        return this;
    }

    setAttribute(key: string, value: any) {
        this._attributes[key] = value;
        return this;
    }

    clearAttributes() {
        this._attributes = {};
    }

    get attributes(): any {
        return this._attributes;
    }
}
