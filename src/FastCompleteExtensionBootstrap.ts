import { ExtensionContext } from "vscode";
import FastCompleteExtensionContext from "./base/context/FastCompleteExtensionContext";

export default class FastCompleteExtensionBootstrap {
  private static context = new FastCompleteExtensionContext();

  private constructor() {}

  static start(context: ExtensionContext) {
    FastCompleteExtensionBootstrap.context.init(context);
  }

  static end() {
    FastCompleteExtensionBootstrap.context.destroy();
  }
}
