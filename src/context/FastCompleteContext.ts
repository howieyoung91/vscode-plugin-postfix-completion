import {Disposable, ExtensionContext, workspace} from "vscode";
import {iocContainer} from "../base/ioc/IocContainer";
import {CONSTANT} from "../base/config/Constant";
import * as glob from "glob";

let files = glob.sync("../postfix/**/*.js", {cwd: __dirname});
files.forEach((path) => {
  import(path);
});
/**
 * 插件的运行环境
 */
let items: Disposable[] = [];

export default class FastCompleteContext {
  config = {
    supportLanguages: [],
  };

  public init(context: ExtensionContext) {
    // 读取配置
    this.readConfig();
    // 应用配置
    this.applyConfig();
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
export {items};
