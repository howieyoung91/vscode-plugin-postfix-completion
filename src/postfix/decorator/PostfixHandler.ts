import { Constructor, iocContainer } from "./IocContainer";

iocContainer.addComponent("postfixHandlers", {});

export function PostfixHandler(language: string, label: string) {
  return (ctor: Constructor) => {
    // Reflect.defineMetadata("language", language, ctor);
    // Reflect.defineMetadata("label", label, ctor);
    iocContainer.getComponent("postfixHandlers")[language][label] = ctor;
    // if (!iocContainer.getComponent("postfixHandlers")[language]) {
    // iocContainer.getComponent("postfixHandlers")[language] = [];
    // }
    // iocContainer.getComponent("postfixHandlers")[language].push(ctor);
  };
}
