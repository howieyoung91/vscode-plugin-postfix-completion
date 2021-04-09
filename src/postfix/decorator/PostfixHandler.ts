import {Constructor, iocContainer} from "./IocContainer";

export function PostfixHandler({language, label}: { language: string, label: string }) {
  return (ctor: Constructor) => {
    let postfixHandlerContainer = iocContainer.postfixHandlerContainerOf(
      language
    );
    postfixHandlerContainer[label] = ctor;
  };
}
