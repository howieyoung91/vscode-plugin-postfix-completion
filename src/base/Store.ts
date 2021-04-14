/**
 * 数据存储类
 * @description 这个类用于PostfixHandler几个方法之间的数据传递,同时也可以作为一个PostfixProvide中不同的CompletionItem的公共数据
 */
export default class Store {
  protected _store: any = {};

  public setData(datas: {}): Store {
    this._store = Object.assign(datas, this._store);
    return this;
  }

  public getData(key: string) {
    return this._store[key];
  }

  public clearData() {
    this._store = {};
  }

  get store(): any {
    return this._store;
  }
}