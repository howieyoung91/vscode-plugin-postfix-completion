import { Constructor, iocContainer } from "./IocContainer";

export default function Postfix({
  language,
  label,
}: {
  language: string;
  label: string;
}) {
  return (ctor: Constructor) => {
    let postfixContainer = iocContainer.postfixContainerOf(language);
    postfixContainer[label] = ctor;
  };
}
