import BasePostfixProvider from "../BasePostfixProvider";

type Constructor<T = any> = new (...args: any[]) => T;

/**
 * ioc容器
 */
class IocContainer {
  private readonly instances: any = {
    postfixProviders: {},
  };

  private IocContainer() {
  }

  public postfixProviders() {
    return this.instances.postfixProviders;
  }

  public postfixProvidersOf(language: string) {
    // 判断是否存在language对应的PostfixProvider
    if (!this.instances.postfixProviders[language]) {
      this.instances.postfixProviders[language] = new BasePostfixProvider(
        language
      );
    }

    return this.instances.postfixProviders[language];
  }

  /**
   * 注册后缀补全提供器
   */
  private registerPostfixProvider(langs?: string[]) {
    let postfixProviderInstants = this.instances.postfixProviders;

    if (langs) {
      for (const lang of langs) {
        if (postfixProviderInstants[lang]) {
          postfixProviderInstants[lang].register();
          console.log(postfixProviderInstants[lang]);
        }
      }
      return;
    }

    // 默认全部启用
    for (const lang in postfixProviderInstants) {
      postfixProviderInstants[lang].register();
      console.log(postfixProviderInstants[lang]);
    }
  }

  /**
   * register
   * @description 注册IOC容器中的所有组件到Vscode中
   */
  public register(langs?: string[]) {
    if (langs.length == 1 && langs[0] === `*`) {
      this.registerPostfixProvider();
      return;
    }
    this.registerPostfixProvider(langs);
    return;
  }
}

const iocContainer = new IocContainer();

export {iocContainer, Constructor};
