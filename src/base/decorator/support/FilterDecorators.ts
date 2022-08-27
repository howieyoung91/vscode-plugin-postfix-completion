import { Keys, TargetSlice } from "../Filter";

/**
 * 在行文本中获取目标字符串
 * @param slice 默认为 {start=data["firstNotWhiteSpaceIndex"],end=lineText.lastIndexOf(".")}, 即行文本
 * @returns
 */
export function SliceDecorator(realMethod, slice: TargetSlice) {
    return (lineText: string, attributes: {}) => {
        // 处理配置
        let startIndex: number,
            endIndex: number,
            skipFirst = 0;

        startIndex = slice.start ? lineText.lastIndexOf(slice.start) : attributes[Keys.FIRST_NOT_WHITESPACE];
        // 找不到就返回
        if (startIndex == -1) {
            return null;
        }
        endIndex = slice.end ? lineText.lastIndexOf(slice.end) : lineText.lastIndexOf(".");
        skipFirst = slice.skipFirst == null ? 0 : slice.skipFirst;
        startIndex += skipFirst;
        if (startIndex >= endIndex) {
            return null;
        }

        // 把目标字符串选出来
        const replacement = lineText.substring(startIndex, endIndex).trimEnd();
        if (replacement.length == 0) {
            return null;
        }

        // attributes[Keys.START] = attributes[Keys.START] ? attributes[Keys.START] + startIndex + 1 : startIndex;
        // attributes[Keys.END] = attributes[Keys.END] ? attributes[Keys.END] + startIndex + 1 : endIndex;
        populateSliceIndex(attributes, startIndex, endIndex);
        return realMethod(replacement, attributes);
    };
}

/**
 *  如果 target 中存在符合 pattern 的字符串则调用真实方法
 */
export function RegexMatchDecorator(realMethod: any, pattern: RegExp) {
    return (target: string, attributes: {}) => (pattern.test(target) ? realMethod(target, attributes) : null);
}

export function RegexSearchDecorator(realMethod: any, pattern: RegExp) {
    return (target: string, attributes: {}) => {
        // console.log("abc de".match(/[a-zA-Z_][a-zA-Z_0-9]*/));
        const matchedStrings: string[] = target.match(pattern);
        // console.log(pattern);
        // console.log(matchedStrings);

        if (!matchedStrings || matchedStrings.length == 0) {
            return null;
        }

        const replacement = matchedStrings[matchedStrings.length - 1];
        const startIndex = target.lastIndexOf(replacement);
        const endIndex = startIndex + replacement.length;

        populateSliceIndex(attributes, startIndex, endIndex);

        return realMethod(replacement, attributes);
    };
}

function populateSliceIndex(attributes: {}, startIndex: number, endIndex: number) {
    const oldStart = attributes[Keys.START];
    const oldEnd = attributes[Keys.END];
    attributes[Keys.START] = oldStart ? oldStart + startIndex : startIndex;
    attributes[Keys.END] = oldEnd ? oldStart + endIndex : endIndex;
}
