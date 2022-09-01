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
import { PostfixHandler } from "../suggest/PostfixHandler";
import { FilterType, ReturnConfig, SourceConfig } from "./ConfigPropertyKeys";
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
class JsonPostfixHandler extends PostfixHandler {
}

export interface JsonHandlerConfig {
    points: PostfixPoint[] | PostfixPoint;
    source?: SourceConfig | string;
    filters?: FilterType[];
    result: ReturnConfig | string;
    return?: ReturnConfig | string;
}

export function buildHandler(config: JsonHandlerConfig) {
    const postfixHandler = new JsonPostfixHandler();
    postfixHandler.handleTarget = proxyHandleTarget(config, generateRealMethod(config));
    return postfixHandler;
}

function generateRealMethod(config: JsonHandlerConfig) {
    return (replacement: string, attributes: any) => {
        if (Assert.isString(config.result)) {
            return config.result.replace("{{replacement}}", replacement);
        } else {
            const properties = config.result.properties;
            switch (config.result.type) {
                case "string": {
                    return escapeString(properties, replacement);
                }
                case "snippet": {
                    return new SnippetString(escapeString(properties, replacement));
                }
            }
        }
    };
}

function escapeString(properties: { value: string }, replacement: string) {
    let s = properties.value.replace("{{replacement}}", replacement);
    s = s.replace("{{indent}}", indent());
    return s;
}

/**
 * 代理 handler 生成处理方法
 *
 *  ===== aspect 0 =====
 *   ==== aspect 1 ====
 *     == aspect 2 ==
 *        method           -> invoke real method
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

function decorateSource(config: JsonHandlerConfig, method: any) {
    if (!config.source) {
        return method;
    }
    const sourceConfig: SourceConfig = { from: null, properties: {} };

    if (Assert.isString(config.source)) {
        sourceConfig.from = config.source;
    } else {
        sourceConfig.from = config.source.from;
    }

    // determine source
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
            const end = sourceConfig.properties.endLineNumber;
            const limit = sourceConfig.properties.limit;
            if (start < 0) {
                start = 0;
            }
            method = DocumentBetweenDecorator(start, end, limit, method);
            break;
        }
    }

    // do decorate
    if (sourceConfig.from === "document") {
        method = DocumentDecorator(method);
    }

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

    // do decorate
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
        // 倒序装饰 确保 aspect 按顺序切入
        for (let i = config.filters.length - 1; i >= 0; i--) {
            const filter = config.filters[i];
            // 如果 filter 是字符串
            if (Assert.isString(filter)) {
                // 如果是 slice
                if (filter === "slice") {
                    method = SliceDecorator(method, {});
                }
            } else {
                if (filter.type === "slice") {
                    method = SliceDecorator(method, filter.properties ?? {});
                } else if (filter.type === "regex-match") {
                    method = RegexMatchDecorator(method, new RegExp(filter.properties.pattern));
                } else if (filter.type === "regex-search") {
                    const pattern = filter.properties.pattern;
                    method = RegexSearchDecorator(method, new RegExp(pattern));
                }
            }
        }
    }
    return method;
}
