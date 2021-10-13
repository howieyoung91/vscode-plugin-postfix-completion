import {ExtensionContext} from "vscode";
import FastCompleteContext from "./context/FastCompleteContext";

/**
 * 这个是插件的启动类
 */
export default class FastCompleteBootstrap {
  private static context = new FastCompleteContext();

  private constructor() {
  }

  static start(context: ExtensionContext) {
    FastCompleteBootstrap.context.init(context);
  }

  static end() {
  }
}
