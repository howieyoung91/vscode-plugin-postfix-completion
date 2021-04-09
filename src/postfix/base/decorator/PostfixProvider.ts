import { Constructor, iocContainer } from "./IocContainer";

export default function PostfixProvider(language: string) {
  return (ctor: Constructor) => {
    iocContainer.postfixProviderContainer()[language] = ctor;
  };
}
