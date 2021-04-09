import { Constructor, iocContainer } from "./IocContainer";

iocContainer.addComponent("postfixs", {});

export function Postfix(language: string, label: string) {
  return (ctor: Constructor) => {
    // 写入元数据
    Reflect.defineMetadata("language", language, ctor);
    Reflect.defineMetadata("label", label, ctor);
    iocContainer.getComponent("postfixs")[language][label] = ctor;
    // if (!iocContainer.getComponent("postfixs")[language]) {
    //   iocContainer.getComponent("postfixs")[language] = [];
    // }
    // iocContainer.getComponent("postfixs")[language].push(ctor);
  };
}
