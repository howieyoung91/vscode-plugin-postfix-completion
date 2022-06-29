export interface LifecycleExtensionContext {
    start(): void;

    // refresh(): void;

    destroy(): void;
}
