/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";

export class Assert {
    static notNull(o: any, message: string) {
        if (o === null || o == undefined) {
            throw new Error(message);
        }
    }

    static isString(s: any): s is string {
        return typeof s === "string";
    }

    static isSnippetString(o: any): o is SnippetString {
        return o instanceof SnippetString;
    }
}
