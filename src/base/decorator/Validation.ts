/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

// todo
export namespace Validation {
    export function Match(regex: RegExp): MethodDecorator {
        return function (target: any, methodName: any, descriptor: TypedPropertyDescriptor<any>) {
            const realMethod = descriptor.value;
        
            descriptor.value = (target: string, data: {}) => {
                let matchedArray = target.match(regex);
                if (!matchedArray || matchedArray.index !== 0 || matchedArray.length == 0) {
                    return null;
                }

                // 不对 target 进行任何处理 调用真实方法
                return realMethod(target, data);
            };
        };
    }

    export function NotBlank() {
        return Match(/\s*/);
    }
}
