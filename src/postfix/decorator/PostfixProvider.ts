import { Constructor, iocContainer } from "./IocContainer";

iocContainer.addComponent("postfixProviders", {});

export function PostfixProvider(language: string) {
  return (ctor: Constructor) => {
    iocContainer.getComponent("postfixProviders")[language] = ctor;
  };
}
