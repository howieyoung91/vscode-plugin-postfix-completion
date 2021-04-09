import BasePostfix from "../BasePostfix";
import BasePostfixProvider from "../BasePostfixProvider";
import { Constructor, iocContainer } from "./IocContainer";
export interface PostfixHandlerId {
  language: string;
  label: string;
}
export function PostfixHandler({ language, label }: PostfixHandlerId) {
  return (postfixHandlerCtor: Constructor) => {
    // new postfixHandler
    let postHandler = new postfixHandlerCtor();
    iocContainer.postfixHandlerContainerOf(language)[label] = postHandler;
    // postfix注入postfixHandler
    let postfix = new BasePostfix(postHandler, label);
    iocContainer.postfixContainerOf(language)[label] = postfix;
    // postfixProvider注入postfix
    if (!iocContainer.postfixProviderContainerOf(language)) {
      iocContainer.postfixProviderContainer()[
        language
      ] = new BasePostfixProvider(language);
    }
    iocContainer.postfixProviderContainer()[language].push(postfix);
  };
}
