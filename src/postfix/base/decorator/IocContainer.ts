import { stringify } from "node:querystring";

type Constructor<T = any> = new (...args: any[]) => T;

/**
 * ioc容器
 */
class IocContainer {
  private readonly instanceContainer: any = {
    postfixContainer: {},
    postfixHandlerContainer: {},
    postfixProviderContainer: {},
  };

  public postfixContainerOf(language: string) {
    if (!this.instanceContainer.postfixContainer[language]) {
      this.instanceContainer.postfixContainer[language] = {};
    }
    return this.instanceContainer.postfixContainer[language];
  }

  public postfixHandlerContainerOf(language: string) {
    if (!this.instanceContainer.postfixHandlerContainer[language]) {
      this.instanceContainer.postfixHandlerContainer[language] = {};
    }
    return this.instanceContainer.postfixHandlerContainer[language];
  }

  public postfixProviderContainer() {
    return this.instanceContainer.postfixProviderContainer;
  }

  public postfixProviderContainerOf(language: string) {
    return this.instanceContainer.postfixProviderContainer[language];
  }
  public register() {
    let postfixProviderInsContainer = this.instanceContainer
      .postfixProviderContainer;
    let postfixInsContainer = this.instanceContainer.postfixContainer;
    // 把postfix注入postfixProvider
    // for (const language in postfixProviderInsContainer) {
    //   for (const label in postfixInsContainer[language]) {
    //     postfixProviderInsContainer[language].push(
    //       postfixInsContainer[language][label]
    //     );
    //   }
    // }
    console.log(postfixInsContainer);
    // 注册provider
    for (const language in postfixProviderInsContainer) {
      postfixProviderInsContainer[language].register();
    }
  }
}

const iocContainer = new IocContainer();
export { iocContainer, Constructor };
