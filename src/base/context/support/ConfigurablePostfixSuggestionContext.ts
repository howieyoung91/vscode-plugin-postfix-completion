import ConfigurableLifecycleExtensionContext from "./ConfigurableLifecycleExtensionContext";
import PostfixSuggestionRegistry from "../PostfixRegistry";

export default interface ConfigurablePostfixSuggestionContext
    extends ConfigurableLifecycleExtensionContext,
        PostfixSuggestionRegistry {
}
