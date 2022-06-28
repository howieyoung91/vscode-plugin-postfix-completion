import { ExtensionContext } from "vscode";
import PostfixCompletionContext from "./base/context/PostfixCompletionContext";

export default class PostfixCompletionBootstrap {
  private static readonly context = new PostfixCompletionContext();

  private constructor() {}

  static start(context: ExtensionContext) {
    PostfixCompletionBootstrap.context.init(context);
  }

  static end() {
    PostfixCompletionBootstrap.context.destroy();
    }
  }
