import { LifecycleExtensionContext } from "../LifecycleExtensionContext";
import { ExtensionContext } from "vscode";
import PostfixConfiguration from "../../config/PostfixConfiguration";

export default interface ConfigurableLifecycleExtensionContext extends LifecycleExtensionContext {
    wrap(rawContext: ExtensionContext): void;

    start(): void;

    destroy(): void;

    getConfiguration(): PostfixConfiguration;
}
