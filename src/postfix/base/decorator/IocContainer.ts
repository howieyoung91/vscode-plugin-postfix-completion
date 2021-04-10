type Constructor<T = any> = new (...args: any[]) => T;

/**
 * ioc容器
 */
class IocContainer {
  private readonly instanceContainer: any = {
    postfixProviders: {},
  };

  public postfixProviders() {
    return this.instanceContainer.postfixProviders;
  }

  public postfixProvidersOf(language: string) {
    return this.instanceContainer.postfixProviders[language];
  }
  public register() {
    let postfixProviderInsContainer = this.instanceContainer.postfixProviders;
    console.log(postfixProviderInsContainer);
    // 注册provider
    for (const language in postfixProviderInsContainer) {
      postfixProviderInsContainer[language].register();
    }
  }
}

const iocContainer = new IocContainer();
export { iocContainer, Constructor };
