import BasePostfixProvider from "../BasePostfixProvider";

type Constructor<T = any> = new (...args: any[]) => T;
/**
 * ioc容器
 */
class IocContainer {
  private readonly instanceContainer: any = {
    postfixProviders: {},
  };

  private IocContainer() {}

  public postfixProviders() {
    return this.instanceContainer.postfixProviders;
  }

  public postfixProvidersOf(language: string) {
    // 判断是否存在language对应的PostfixProvider
    if (!this.instanceContainer.postfixProviders[language]) {
      this.instanceContainer.postfixProviders[
        language
      ] = new BasePostfixProvider(language);
    }
    return this.instanceContainer.postfixProviders[language];
  }

  /**
   * 注册后缀补全提供器
   */
  private registerPostfixProvider() {
    let postfixProviderInsContainer = this.instanceContainer.postfixProviders;
    console.log(postfixProviderInsContainer);
    for (const language in postfixProviderInsContainer) {
      postfixProviderInsContainer[language].register();
    }
  }

  /**
   * register
   * @description 注册IOC容器中的所有组件到Vscode中
   */
  public register() {
    this.registerPostfixProvider();
  }
}

const iocContainer = new IocContainer();
export { iocContainer, Constructor };
