/**
 * 数据存储类
 * @description 这个类用于PostfixHandler几个方法之间的数据传递
 */
export default class Store {
    protected _store: any = {};

    get store(): any {
        return this._store;
    }

    public add(data: {}): Store {
        this._store = Object.assign(data, this._store);
        return this;
    }

    public get(key: string) {
        return this._store[key];
    }

    public clear() {
        this._store = {};
    }
}
