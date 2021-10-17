import {ExtensionContext} from "vscode";
import FastCompleteContext from "./base/context/FastCompleteContext";

export default class FastCompleteBootstrap {
  private static context = new FastCompleteContext();

  private constructor() {
  }

  static start(context: ExtensionContext) {
    FastCompleteBootstrap.context.init(context);
  }

  static end() {
    FastCompleteBootstrap.context.destroy();
  }
}
