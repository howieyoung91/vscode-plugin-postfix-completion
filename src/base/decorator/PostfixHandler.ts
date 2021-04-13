/* eslint-disable @typescript-eslint/naming-convention */
import { window } from "vscode";
import BasePostfix from "../BasePostfix";
import { Constructor, iocContainer } from "./IocContainer";

/**
 * @description PostfixHandlerPosition 表示PostHandler作用的位置,
 *              { language:java, label:if } 表示在java文件下使用`if`触发补全
 */
interface PostfixHandlerPosition {
  language: string;
  label: string;
}
/**
 * PostfixHandler 后缀处理器注解
 * @description 这个类是一个装饰器,用于装饰 BasePostfixHandler,
 *              一旦某个BasePostfixHandler被装饰,那么将会被自动
 *              注入IOC容器,IOC容器将接管这个被装饰的类
 * @param positions PostfixHandler作用的位置
 */
export function PostfixHandler(...positions: PostfixHandlerPosition[]) {
  return (postfixHandlerCtor: Constructor) => {
    // console.log(postfixHandlerCtor);
    let postfixHandler = new postfixHandlerCtor();
    // TODO 目前只实现了postHandler的复用,可以优化postfix的复用
    for (const pos of positions) {
      // if (!iocContainer.postfixProvidersOf(pos.language)) {
      //   iocContainer.postfixProviders()[pos.language] = new BasePostfixProvider(
      //     pos.language
      //   );
      // }
      iocContainer
        .postfixProvidersOf(pos.language)
        .push(new BasePostfix(postfixHandler, pos.label));
    }
  };
}
