/* eslint-disable @typescript-eslint/naming-convention */
import BasePostfix from "../BasePostfix";
import BasePostfixProvider from "../BasePostfixProvider";
import { Constructor, iocContainer } from "./IocContainer";
/**
 * @description PostfixHandlerPosition表示PostHandler作用的位置 ,{ language:java, label:if }表示在java文件下使用if触发补全
 */
interface PostfixHandlerPosition {
  language: string;
  label: string;
}
export function PostfixHandler(...ids: PostfixHandlerPosition[]) {
  return (postfixHandlerCtor: Constructor) => {
    let postfixHandler = new postfixHandlerCtor();
    // TODO 目前只实现了postHandler的复用,可以优化postfix的复用
    for (const id of ids) {
      if (!iocContainer.postfixProvidersOf(id.language)) {
        iocContainer.postfixProviders()[id.language] = new BasePostfixProvider(
          id.language
        );
      }
      iocContainer
        .postfixProviders()
        [id.language].push(new BasePostfix(postfixHandler, id.label));
    }
  };
}
