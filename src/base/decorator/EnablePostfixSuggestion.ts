import PostfixSuggestion from "../suggest/PostfixSuggestion";
import PostfixHandler from "../suggest/PostfixHandler";
import { CONTEXT } from "../context/support/PostfixCompletionContext";

type Constructor<T = any> = new (...args: any[]) => T;

/**
 *  PostfixSuggestionPoint 表示 PostfixHandler 作用的位置,
 * { language:java, label:if } 表示在java文件下使用`if`触发补全
 */
interface PostfixSuggestionPoint {
    label: string;
    language: string;
}

/**
 * EnablePostfixSuggestion 后缀处理器注解 这个类是一个装饰器,用于装饰 PostfixHandler,
 * 一旦某个 PostfixHandler 被装饰,那么将会被自动注入到 componentManager , componentManager 将接管这个被装饰的类
 * @param points PostfixHandler 作用的位置
 */
export function EnablePostfixSuggestion(...points: PostfixSuggestionPoint[]) {
    return (postfixHandlerCtor: Constructor) => {
        if (!(postfixHandlerCtor.prototype instanceof PostfixHandler)) {
            return;
        }
        let handler = new postfixHandlerCtor();
        for (const position of points) {
            CONTEXT.registerPostfixSuggestion(position.language, PostfixSuggestion.of(position.label, handler));
        }
    };
}
