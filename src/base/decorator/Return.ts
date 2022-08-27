/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { Assert } from "../../util/Assert";
import TargetHandleResult from "../suggest/TargetHandleResult";
import { Keys } from "./Filter";

// todo
interface ReturnSlice {
    startIndex?: number;
    endIndex?: number;
}

export function ReturnDecorator(realMethod) {
    return (lineText: string, data: {}): TargetHandleResult => {
        let result = realMethod(lineText, data);
        if (result == null) {
            return null;
        }
        // enhance result
        switch (typeof result) {
            case "object": {
                if (Assert.isSnippetString(result)) {
                    result = {
                        text: result,
                        deleteText: {
                            start: data[Keys.START],
                            end: data[Keys.END] + 1,
                        },
                    };
                } else {
                    // 把要删除的区间附加进去
                    result.deleteText = {
                        start: data[Keys.START],
                        end: data[Keys.END] + 1,
                    };
                }
                break;
            }
            case "string": {
                result = {
                    text: result,
                    deleteText: {
                        start: data[Keys.START],
                        end: data[Keys.END] + 1,
                    },
                };
                break;
            }
        }
        return result;
    };
}

export namespace Return {
    export function Replace() {
        return function (target: any, methodName: any, descriptor: TypedPropertyDescriptor<any>) {
            const realMethod = descriptor.value;
            descriptor.value = ReturnDecorator(realMethod);
        };
    }
}
