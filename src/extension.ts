import { Disposable, ExtensionContext } from "vscode";
import { iocContainer } from "./base/ioc/IocContainer";
import "./ComponentScan";
// 扫描postfix
let items: Disposable[] = [];
export function activate(context: ExtensionContext) {
  iocContainer.register();
  context.subscriptions.push(...items);
}
export function deactivate() {}
export { items };
