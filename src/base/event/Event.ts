/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

// todo event module
export interface ExtensionEvent<S> {
    getSource(): S;
}
export interface EventListener<T extends ExtensionEvent<any>> {
    onEvent(event: T): void;
}
export class EventPublisher {}
