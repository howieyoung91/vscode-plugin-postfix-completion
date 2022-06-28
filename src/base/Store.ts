/**
 * 数据存储类
 * @description 这个类用于PostfixHandler几个方法之间的数据传递
 */
export default class Store {
  protected _store: any = {};

  public add(data: {}): Store {
    this._store = Object.assign(data, this._store);
    return this;
  }

  public get(key: string) {
    return this._store[key];
  }

  // public setData(obj: {}) {
  //   for (let key in obj) {
  //     this._store[key] = obj[key];
  //   }
  //   return this;
  // }

  public clearData() {
    this._store = {};
  }

  get store(): any {
    return this._store;
  }
}
