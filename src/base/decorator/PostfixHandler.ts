/* eslint-disable @typescript-eslint/naming-convention */
import BasePostfix from "../BasePostfix";
import BasePostfixHandler from "../BasePostfixHandler";
import {Constructor, iocContainer} from "../ioc/IocContainer";

/**
 * @description PostfixHandlerPosition 表示PostfixHandler作用的位置,
 *              { language:java, label:if } 表示在java文件下使用`if`触发补全
 */
interface PostfixHandlerPosition {
  language: string;
  label: string;
}

/**
 * PostfixHandler 后缀处理器注解
 * @description 这个类是一个装饰器,用于装饰 BasePostfixHandler,
 *              一旦某个 BasePostfixHandler 被装饰,那么将会被自动
 *              注入 IOC 容器, IOC 容器将接管这个被装饰的类
 * @param positions PostfixHandler 作用的位置
 */
export function PostfixHandler(...positions: PostfixHandlerPosition[]) {
  return (postfixHandlerCtor: Constructor) => {
    // console.log(postfixHandlerCtor);
    if (!(postfixHandlerCtor.prototype instanceof BasePostfixHandler)) {
      return;
    }
    let postfixHandler = new postfixHandlerCtor();
    // TODO 目前只实现了 postfixHandler 的复用,可以优化 postfix 的复用
    for (const pos of positions) {
      iocContainer
        .postfixProvidersOf(pos.language)
        .push(new BasePostfix(postfixHandler, pos.label));
    }
  };
}
