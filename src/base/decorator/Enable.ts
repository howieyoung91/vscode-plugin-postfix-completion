/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { PluginContext } from "../context/support/PostfixCompletionContext";
import { PostfixCommandEnhancer } from "../support/command/CommandEnhancer";
import { PostfixCommand } from "../support/command/PostfixCommand";
import { PostfixCommandHandler } from "../support/command/PostfixCommandHandler";
import { PostfixHandler } from "../support/PostfixHandler";
import PostfixSuggestion from "../support/PostfixSuggestion";

type Constructor<T = any> = new (...args: any[]) => T;

/**
 *  PostfixSuggestionPoint 表示 PostfixHandler 作用的位置,
 * { language:java, label:if } 表示在java文件下使用`if`触发补全
 */
export interface PostfixPoint {
    label: string;
    language: string;
}

/**
 * EnablePostfixSuggestion 后缀处理器注解 这个类是一个装饰器,用于装饰 PostfixHandler,
 * 一旦某个 PostfixHandler 被装饰,那么将会被自动注入到 componentManager , componentManager 将接管这个被装饰的类
 * @param points PostfixHandler 作用的位置
 */
export function EnablePostfixSuggestion(...points: PostfixPoint[]) {
    return (postfixHandlerCtor: Constructor) => {
        if (!(postfixHandlerCtor.prototype instanceof PostfixHandler)) {
            return;
        }
        let handler = new postfixHandlerCtor();
        for (const point of points) {
            PluginContext.registerPostfixSuggestion(point.language, PostfixSuggestion.of(point.label, handler));
        }
    };
}

export interface PostfixCommandPoint extends PostfixPoint {
    enhancers?: PostfixCommandEnhancer[];
}

let i = 1;

export function EnablePostfixCommand(...points: PostfixCommandPoint[]) {
    return (postfixHandlerCtor: Constructor) => {
        if (!(postfixHandlerCtor.prototype instanceof PostfixCommandHandler)) {
            return;
        }
        const handler = new postfixHandlerCtor();
        for (const point of points) {
            const postfixCommand = new PostfixCommand(`postfixcommand.${i}`, point.label, handler);
            if (point.enhancers) {
                postfixCommand.addEnhancers(point.enhancers);
            }
            PluginContext.registerPostfixSuggestion(point.language, postfixCommand);
            i++;
        }
    };
}
