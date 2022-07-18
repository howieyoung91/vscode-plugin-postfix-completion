/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import ConfigurableLifecycleExtensionContext from "./ConfigurableLifecycleExtensionContext";
import PostfixSuggestionRegistry from "../PostfixRegistry";

export default interface ConfigurablePostfixSuggestionContext extends ConfigurableLifecycleExtensionContext, PostfixSuggestionRegistry {}
