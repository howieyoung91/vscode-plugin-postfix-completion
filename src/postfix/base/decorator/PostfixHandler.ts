import BasePostfix from "../BasePostfix";
import { Constructor, iocContainer } from "./IocContainer";

export function PostfixHandler({
  language,
  label,
}: {
  language: string;
  label: string;
}) {
  return (postfixHandlerctor: Constructor) => {
    let postfixHandlerContainer = iocContainer.postfixHandlerContainerOf(
      language
    );
    postfixHandlerContainer[label] = postfixHandlerctor;
    // 自动注入postfix
    iocContainer.postfixContainerOf(language)[label] = BasePostfix;
  };
}
