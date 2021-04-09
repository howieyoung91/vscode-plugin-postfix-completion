type Constructor<T = any> = new (...args: any[]) => T;

/**
 * ioc容器
 */
class IocContainer {
  private readonly ctorContainer: any = {
    postfixContainer: {},
    postfixHandlerContainer: {},
    postfixProviderContainer: {},
  };
  private readonly instanceContainer: any = {
    postfixContainer: {},
    postfixHandlerContainer: {},
    postfixProviderContainer: {},
  };

  public postfixContainerOf(language: string) {
    if (!this.ctorContainer.postfixContainer[language]) {
      this.ctorContainer.postfixContainer[language] = {};
    }
    return this.ctorContainer.postfixContainer[language];
  }

  public postfixHandlerContainerOf(language: string) {
    if (!this.ctorContainer.postfixHandlerContainer[language]) {
      this.ctorContainer.postfixHandlerContainer[language] = {};
    }
    return this.ctorContainer.postfixHandlerContainer[language];
  }

  public postfixProviderContainer() {
    return this.ctorContainer.postfixProviderContainer;
  }

  public register() {
    // new PostfixHandler
    let postfixHandlerCtorContainer = this.ctorContainer
      .postfixHandlerContainer;
    let postfixHandlerInsContainer = this.instanceContainer
      .postfixHandlerContainer;
    let postfixProviderCtorContainer = this.ctorContainer
      .postfixProviderContainer;
    let postfixProviderInsContainer = this.instanceContainer
      .postfixProviderContainer;
    let postfixCtorContainer = this.ctorContainer.postfixContainer;
    let postfixInsContainer = this.instanceContainer.postfixContainer;
    for (const language in postfixHandlerCtorContainer) {
      let labelPostfixHanlderMap = postfixHandlerCtorContainer[language];
      // 创建map
      if (!postfixHandlerInsContainer[language]) {
        postfixHandlerInsContainer[language] = {};
      }
      for (const label in labelPostfixHanlderMap) {
        let postfixHandler = labelPostfixHanlderMap[label];
        postfixHandlerInsContainer[language][label] = new postfixHandler();
      }
    }
    // new PostfixProvider
    for (const language in postfixProviderCtorContainer) {
      let postfixProviderCtor: any = postfixProviderCtorContainer[language];
      let providerInstance = new postfixProviderCtor(language);
      // 推入实例容器
      postfixProviderInsContainer[language] = providerInstance;
    }

    // new Postfix

    for (const language in postfixCtorContainer) {
      // 创建map
      if (!postfixInsContainer[language]) {
        postfixInsContainer[language] = {};
      }
      let labelPostfixMap = postfixCtorContainer[language];
      for (const label in labelPostfixMap) {
        if (
          !postfixHandlerInsContainer[language][label] ||
          !postfixProviderInsContainer[language]
        ) {
          // 如果需要注入的postfixHandler为undefined或者null || 对应语言的provider不存在则跳过
          continue;
        }
        // 获取构造器
        let postfixCtor = labelPostfixMap[label];
        // 创建实例
        let postfixInstance = new postfixCtor(
          postfixHandlerInsContainer[language][label],
          label
        );
        postfixInsContainer[language][label] = postfixInstance;
        postfixProviderInsContainer[language].push(postfixInstance);
      }
    }
    console.log(postfixInsContainer);
    // 注册provider
    for (const language in postfixProviderInsContainer) {
      postfixProviderInsContainer[language].register();
    }
  }
}

const iocContainer = new IocContainer();
export {iocContainer, Constructor};
