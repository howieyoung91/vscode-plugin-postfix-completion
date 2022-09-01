/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import PostfixSuggestion from "./PostfixSuggestion";

export interface PostfixSuggestionSupplier {
    supplyPostfixSuggestions(suggestion: PostfixSuggestion, ...suggestions: PostfixSuggestion[]): any;
}
