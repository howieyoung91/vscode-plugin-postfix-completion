export default abstract class BaseComplete {
  protected _language: string;

  protected constructor(language: string) {
    this._language = language;
  }

  get language(): string {
    return this._language;
  }
}
