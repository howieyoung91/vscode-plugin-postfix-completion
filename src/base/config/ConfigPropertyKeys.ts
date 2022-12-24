/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { TargetSlice } from "../decorator/Filter";

export enum ConfigPropertyKeys {
    ENABLE_LANGUAGES = `postfixcompletion.languages.enable`,
    DISABLE_LANGUAGES = `postfixcompletion.languages.disable`,
    CUSTOM_SUGGESTIONS = `postfixcompletion.custom.suggestions`,
}

//---------------------------------------------------------------------------------------------
//                                   Source Config
//---------------------------------------------------------------------------------------------

export interface SourceConfig {
    from: string;
    properties: { lineNumber?: number; startLineNumber?: number; endLineNumber?: number; limit?: number };
}

//---------------------------------------------------------------------------------------------
//                                    Filter Type
//---------------------------------------------------------------------------------------------

export interface SliceType {
    type: "slice";
    properties?: TargetSlice; // TargetSlice
}

export interface RegexMatchType {
    type: "regex-match";
    properties: {
        pattern: string;
    };
}

export interface RegexSearchType {
    type: "regex-search";
    properties: {
        pattern: string;
    };
}

export type FilterConfig = SliceType | RegexMatchType | RegexSearchType | string;

//---------------------------------------------------------------------------------------------
//                                    Return Type
//---------------------------------------------------------------------------------------------
export interface ReturnConfig {
    type: string;
    properties: {
        value: string;
    };
}
