type Constructor<T = any> = new (...args: any[]) => T;

class IocContainer {
  private readonly ctorContainer: any = {};
  private readonly instanceContainer: any = {};

  public addComponent(key: string, target: any) {
    this.ctorContainer[key] = target;
  }

  public getComponent(key: string) {
    return this.ctorContainer[key];
  }

  public register() {
    // new PostfixHandler
    let postfixHandlerCtors = this.ctorContainer.postfixHandlers;
    for (const language in postfixHandlerCtors) {
      let labelPostfixHanlderMap = postfixHandlerCtors[language];
      for (const label in labelPostfixHanlderMap) {
        let postfixHandler = labelPostfixHanlderMap[label];
        this.instanceContainer.postfixHandlers[language][
          label
        ] = new postfixHandler();
      }
    }
    // new PostfixProvider
    let postfixProviderCtors = this.ctorContainer.postfixProviders;
    for (const language in postfixProviderCtors) {
      let postfixProviders: Constructor[] = postfixProviderCtors[language];
      for (const postfixProvider of postfixProviders) {
        let providerInstance = new postfixProvider(language);
        // 推入实例容器
        this.instanceContainer.postfixProviders[language] = providerInstance;
      }
    }
    // new Postfix
    let postfixCtors = this.ctorContainer.postfixs;
    for (const language in postfixCtors) {
      let labelPostfixMap = postfixCtors[language];
      for (const label in labelPostfixMap) {
        let postfix = labelPostfixMap[label];
        this.instanceContainer.postfixs[language][label] = new postfix(
          this.instanceContainer.postfixHandlers[language][label],
          label
        );
        this.instanceContainer.postfixProviders[language]
          .push(postfix)
          .register();
      }
    }
  }
}

const iocContainer = new IocContainer();
export { iocContainer, Constructor };
