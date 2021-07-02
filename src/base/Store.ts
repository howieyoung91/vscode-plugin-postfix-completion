/**
 * 数据存储类
 * @description 这个类用于PostfixHandler几个方法之间的数据传递
 */
export default class Store {
  protected _store: any = {};

  public addData(datas: {}): Store {
    this._store = Object.assign(datas, this._store);
    return this;
  }

  public getData(key: string) {
    return this._store[key];
  }

  public setData(obj: {}) {
    for (let key in obj) {
      this._store[key] = obj[key];
    }
    // this._store[key] = value;
    return this;
  }

  public clearData() {
    this._store = {};
  }

  get store(): any {
    return this._store;
  }
}
