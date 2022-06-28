import { Disposable, ExtensionContext, workspace } from "vscode";
import { iocContainer } from "../ioc/IocContainer";
import { CONSTANT } from "../config/Constant";
import * as glob from "glob";

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
    supportLanguages: [],
  };

  public init(context: ExtensionContext) {
    // 读取配置
    this.readConfig();
    // 应用配置
    this.applyConfig();
    // 注册进入 vscode
    this.registerIntoVscode(context);
  }

  public destroy() {}

  private registerIntoVscode(context: ExtensionContext) {
    context.subscriptions.push(...items);
  }

  private readConfig() {
    let configuration = workspace.getConfiguration();
    let supportLanguages: string[] = configuration.get(
      CONSTANT.PROPERTY.SUPPORT_LANG
    );
    if (supportLanguages === undefined) {
      supportLanguages = ["*"];
    }
    this.config.supportLanguages = supportLanguages;
  }

  private applyConfig() {
    // 只注册允许的postfix
    iocContainer.register(this.config.supportLanguages);
  }
}
