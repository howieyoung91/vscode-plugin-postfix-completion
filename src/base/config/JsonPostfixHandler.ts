/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { SnippetString } from "vscode";
import { Assert } from "../../util/Assert";
import { indent } from "../../util/DocumentUtil";
import { PostfixPoint } from "../decorator/Enable";
import { ReturnDecorator } from "../decorator/Return";
import { DocumentBetweenDecorator, DocumentDecorator, LineTextDecorator } from "../decorator/Source";
import { RegexMatchDecorator, RegexSearchDecorator, SliceDecorator } from "../decorator/support/FilterDecorators";
import { PostfixHandler } from "../support/PostfixHandler";
import { FilterConfig, ReturnConfig, SourceConfig } from "./ConfigPropertyKeys";

class JsonPostfixHandler extends PostfixHandler {}

// {
//     "points": [{ "language": "java", "label": "fori" }],
//     "source": {
//         "from": "lineText"
//     },
//     "filter": {
//         "slice": {
//             "order": 0,
//             "start": " ",
//             "end": ".",
//             "skipFirst": 1
//         }
//     },
//     "result": "{{replacement}}",
//     "return": {
//         "type": "replace"
//     }
// }
export interface JsonHandlerConfig {
    //  "points": [{ "language": "java", "label": "fori" }]
    //  "points": { "language": "java", "label": "fori" }
    points: PostfixPoint[] | PostfixPoint;
    /*
        "source": {
            "from": "lineText",
            "properties": {

            }
        }

        "source": "lineText"
    */
    source?: SourceConfig | string;
    /*
        "filters": [{
            "type": "slice",
            "properties": {
                "start"     ?: string, // 起始位置
                "end"       ?: string, // 结束位置
                "skipFirst" ?: number, // 是否跳过起始字符, 用于去除某些空格
            }
        }, {
            "type": "regex-match",
            "properties": {
                 "pattern": string,
            }
        }, {
            "type": "regex-search",
            "properties": {
                 "pattern": string,
            }
        }]
    */
    filters?: FilterConfig[];
    // declare result
    result: ReturnConfig | string;
    /*
        "type": string;
        "properties": {
            "value": string;
        };
    */
    return?: ReturnConfig | string;
}

export function buildHandler(config: JsonHandlerConfig) {
    const postfixHandler = new JsonPostfixHandler();
    postfixHandler.handleTarget = proxyHandleTarget(config, generateActualMethod(config));
    return postfixHandler;
}

function generateActualMethod(config: JsonHandlerConfig) {
    return (replacement: string, attributes: any) => {
        if (Assert.isString(config.result)) {
            // todo support script
            return config.result.replace("{{replacement}}", replacement);
        } else {
            const properties = config.result.properties;
            let escapedString = escapeString(properties, replacement);

            // wrap if necessary
            if (config.result.type === "string") {
                return escapedString;
            } else if (config.result.type === "snippet") {
                return new SnippetString(escapedString);
            }
        }
    };
}

function escapeString(properties: { value: string }, replacement: string) {
    let s = properties.value;
    s = s.replace("{{replacement}}", replacement);
    s = s.replace("{{indent}}", indent());
    return s;
}

/**
 * 代理 handler 生成处理方法
 *
 *  ===== aspect 0 =====
 *   ==== aspect 1 ====
 *     == aspect 2 ==
 *        method           ->   invoke actual method
 *      = aspect 3 =
 *     == aspect 2 ==
 *   ==== aspect 1 ====
 *  ===== aspect 0 =====
 */
function proxyHandleTarget(config: JsonHandlerConfig, method: any) {
    method = decorateReturn(method, config);
    method = decorateFilter(method, config);
    method = decorateSource(config, method);
    return method;
}

function decorateReturn(method: any, config: JsonHandlerConfig) {
    if (!config.return) {
        return method;
    }

    const returnConfig: { type: string } = { type: null };
    // adapt config
    if (Assert.isString(config.return)) {
        returnConfig.type = config.return;
    } else {
        returnConfig.type = config.return.type;
    }

    //! do decorate
    if (returnConfig.type === "replace") {
        method = ReturnDecorator(method);
    }
    return method;
}

function decorateFilter(method: any, config: JsonHandlerConfig) {
    if (!config.filters) {
        return method;
    }

    if (config.filters) {
        //! 倒序装饰 确保按顺序装饰
        for (let i = config.filters.length - 1; i >= 0; i--) {
            const filter = config.filters[i];
            // 如果 filter 是字符串
            if (Assert.isString(filter)) {
                if (filter === "slice") {
                    method = SliceDecorator(method, {});
                }
            } else {
                filter.properties = filter.properties ?? {}; // make sure not null

                if (filter.type === "slice") {
                    method = SliceDecorator(method, filter.properties ?? {});
                } else if (filter.type === "regex-match") {
                    const pattern = filter.properties.pattern;
                    if (pattern) {
                        method = RegexMatchDecorator(method, new RegExp(pattern));
                    }
                } else if (filter.type === "regex-search") {
                    const pattern = filter.properties.pattern;
                    if (pattern) {
                        method = RegexSearchDecorator(method, new RegExp(pattern));
                    }
                }
            }
        }
    }
    return method;
}

function decorateSource(config: JsonHandlerConfig, method: any) {
    if (!config.source) {
        return method;
    }

    const sourceConfig: SourceConfig = { from: null, properties: {} };

    // adapt config
    if (Assert.isString(config.source)) {
        sourceConfig.from = config.source;
    } else {
        // config.source.properties
        sourceConfig.from = config.source.from;
        sourceConfig.properties = config.source.properties;
    }

    // determine source and do decorate
    switch (sourceConfig.from) {
        case "document": {
            method = DocumentDecorator(method);
            break;
        }
        case "lineText": {
            const lineNumber = sourceConfig.properties.lineNumber;
            if (lineNumber) {
                method = LineTextDecorator(lineNumber, method);
            }
            break;
        }
        case "between": {
            let start = sourceConfig.properties.startLineNumber;
            if (start < 0) {
                start = 0;
            }
            const end = sourceConfig.properties.endLineNumber;
            const limit = sourceConfig.properties.limit;

            method = DocumentBetweenDecorator(start, end, limit, method);
            break;
        }
    }

    // do decorate
    // if (sourceConfig.from === "document") {
    //     method = DocumentDecorator(method);
    // }

    return method;
}
