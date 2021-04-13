
export default class StringUtil {
  private constructor() {}

  public static isNumber(raw: string): boolean {
    return raw.match(/^[0-9]+.?[0-9]*$/) ? true : false;
  }

  public static isInt(raw: string): boolean {
    return raw.match(/^[0-9]+$/) ? true : false;
  }

  public static isMatched(raw: string, char1: string, char2: string): boolean {
    let cnt: number = 0;
    for (const char of raw) {
      switch (char) {
        case char1:
          cnt++;
          continue;
        case char2:
          cnt--;
      }
    }
    console.log(cnt);
    return cnt === 0;
  }
}
