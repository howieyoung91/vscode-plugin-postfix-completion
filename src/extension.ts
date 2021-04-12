import { Disposable, ExtensionContext, window } from "vscode";
import { iocContainer } from "./postfix/base/decorator/IocContainer";

import("./ImportAll");

let items: Disposable[] = [];
export { items };

export function activate(context: ExtensionContext) {
  iocContainer.register();
  context.subscriptions.push(...items);
}
export function deactivate() {}
