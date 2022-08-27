/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { RegexMatchDecorator, RegexSearchDecorator, SliceDecorator } from "./support/FilterDecorators";

export enum Keys {
    FIRST_NOT_WHITESPACE = "firstNotWhiteSpaceIndex",
    // SLICE_START = "slice#start-index",
    // SLICE_END = "slice#end-index",
    START = "startIndex",
    END = "endIndex",
    // REGEX_SEARCH_START = "regex#search-start-index",
    // REGEX_SEARCH_END = "regex#search-end-index",
    // REGEX_MATCH_START = "regex#match-start-index",
    // REGEX_MATCH_END = "regex#match-end-index",
}

export interface TargetSlice {
    start?: string; // 起始位置
    end?: string; // 结束位置
    skipFirst?: number; // 是否跳过起始字符, 用于去除某些空格
}

/**
 * AOP
 */
export namespace Filter {
    export function Slice(slice?: TargetSlice): MethodDecorator {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
            // 接受参数为当前类 和 接受参数为当前方法名称 和  方法的描述
            const realMethod = descriptor.value;
            slice = slice ?? {};
            descriptor.value = SliceDecorator(realMethod, slice);
        };
    }

    export namespace Regex {
        export function Search(regex: RegExp) {
            return function (target: any, methodName: any, descriptor: TypedPropertyDescriptor<any>) {
                const realMethod = descriptor.value;
                descriptor.value = RegexSearchDecorator(realMethod, regex);
            };
        }
    }

    export namespace Validation {
        export function Contains(regex: RegExp) {
            return function (target: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) {
                const realMethod = descriptor.value;
                if (!regex) {
                    return null;
                }
                descriptor.value = RegexMatchDecorator(realMethod, regex);
            };
        }
    }
}
