export default class StringUtil {
    private constructor() {
    }

    public static UpperFirstChar(raw: string): string {
        return raw.replace(/^\S/, (s) => s.toUpperCase());
    }

    public static isNumber(raw: string): boolean {
        return !!raw.match(/^[0-9]+.?[0-9]*$/);
    }

    public static isInt(raw: string): boolean {
        return !!raw.match(/^[0-9]+$/);
    }

    public static javaTypeOf(text: string): string {
        let type = null;
        if (text.match(/^[0-9_]+$/) || text.match(/^0[Xx][0-9a-fA-F_]+$/)) {
            type = `int`;
        } else if (text.match(/^[0-9_]+(\.[0-9_]+)?[DdFf]?$/)) {
            if (text[text.length - 1].match(/[0-9]/)) {
                type = `double`;
            } else {
                switch (text[text.length - 1]) {
                    case `F`:
                    case `f`:
                        type = `float`;
                        break;
                    case `D`:
                    case `d`:
                        type = `double`;
                        break;
                    default:
                        break;
                }
            }
        } else if (text === `true` || text === `false`) {
            type = `boolean`;
        } else if (text.match(/^".*"$/)) {
            type = `String`;
        } else if (text.match(/^'.'$/)) {
            type = `char`;
        }
        return type;
    }
}
