import { Disposable, ExtensionContext } from "vscode";
import { iocContainer } from "./base/decorator/IocContainer";
import "./all";
let items: Disposable[] = [];
export { items };
export function activate(context: ExtensionContext) {
  iocContainer.register();
  context.subscriptions.push(...items);
}
export function deactivate() {}
