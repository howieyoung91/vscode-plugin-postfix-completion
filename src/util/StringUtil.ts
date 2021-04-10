export default class StringUtil {
  private constructor() {}

  public static isNumber(raw: string): boolean {
    return raw.match(/^[0-9]+.?[0-9]*$/) ? true : false;
  }

  public static isInt(raw: string): boolean {
    return raw.match(/^[0-9]+$/) ? true : false;
  }
}
