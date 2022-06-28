import { ExtensionContext } from "vscode";
import { CONTEXT } from "./base/context/support/PostfixCompletionContext";

export default class PostfixCompletionBootstrap {
    static start(context: ExtensionContext) {
        CONTEXT.wrap(context);
        CONTEXT.start();
    }

    static end() {
        CONTEXT.destroy();
    }
}
