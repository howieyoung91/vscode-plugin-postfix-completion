import { Disposable, ExtensionContext, workspace } from "vscode";
import { CONSTANT } from "./base/config/Constant";
import { iocContainer } from "./base/ioc/IocContainer";
import "./PostfixScan";
// 扫描postfix
let items: Disposable[] = [];
export function activate(context: ExtensionContext) {
  // 读取
  let supportLangs: string[] = workspace
    .getConfiguration()
    .get(CONSTANT.PROPERTY.SUPPORT_LANG);
  if (supportLangs === undefined) {
    supportLangs = ["*"];
  }
  
  iocContainer.register(supportLangs);
  context.subscriptions.push(...items);
}
export function deactivate() {}
export { items };
