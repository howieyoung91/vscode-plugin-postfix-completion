import * as glob from "glob";
import { Disposable, ExtensionContext, workspace } from "vscode";

import { CONSTANT } from "../config/Constant";
import { iocContainer } from "../ioc/IocContainer";

// 读入文件
let files = glob.sync("../../postfix/**/*.js", { cwd: __dirname });
files.forEach((path) => {
  import(path);
});

export let items: Disposable[] = [];

/**
 * 插件的运行环境
 */
export default class FastCompleteExtensionContext {
  config = {
    supportedLanguages: [],
  };

  public init(context: ExtensionContext) {
    this.readConfig(); // 读取配置
    this.applyConfig(); // 应用配置
    this.registerContext(context); // 注册进入 vscode
  }

  public destroy() {
  }

  private registerContext(context: ExtensionContext) {
    context.subscriptions.push(...items);
  }

  private readConfig() {
    let configuration = workspace.getConfiguration();
    let supportedLanguages: string[] = configuration.get(CONSTANT.PROPERTY.SUPPORTED_LANGUAGES);
    if (supportedLanguages === undefined) {
      supportedLanguages = ["*"];
    }
    this.config.supportedLanguages = supportedLanguages;
  }

  private applyConfig() {
    // 只注册允许的 postfix
    iocContainer.register(this.config.supportedLanguages);
  }
}
