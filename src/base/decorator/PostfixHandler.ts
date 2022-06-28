import BasePostfix from "../BasePostfix";
import BasePostfixHandler from "../BasePostfixHandler";
import { CONTEXT } from "../context/support/PostfixCompletionContext";
// import { COMPONENT_MANAGER, Constructor } from "../context/PostfixCompletionContext";
type Constructor<T = any> = new (...args: any[]) => T;

/**
 *  PostfixPoint 表示PostfixHandler作用的位置,
 * { language:java, label:if } 表示在java文件下使用`if`触发补全
 */
interface PostfixPoint {
    language: string;
    label: string;
}

/**
 * PostfixHandler 后缀处理器注解 这个类是一个装饰器,用于装饰 BasePostfixHandler,
 * 一旦某个 BasePostfixHandler 被装饰,那么将会被自动注入 componentManager , componentManager 将接管这个被装饰的类
 * @param positions PostfixHandler 作用的位置
 */
export function PostfixHandler(...positions: PostfixPoint[]) {
    return (postfixHandlerCtor: Constructor) => {
        if (!(postfixHandlerCtor.prototype instanceof BasePostfixHandler)) {
            return;
        }
        let postfixHandler = new postfixHandlerCtor();
        for (const position of positions) {
            CONTEXT.registerPostfix(position.language, new BasePostfix(postfixHandler, position.label));
        }
    };
}
