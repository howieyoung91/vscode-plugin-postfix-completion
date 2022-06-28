export class ComponentManager {
    private readonly singletons: any = {};

    public registerComponent(key: string, obj: any) {
        this.singletons[key] = obj;
    }

    public getComponent(key: string) {
        return this.singletons[key];
    }

    public getComponentNotNull(key: string, value) {
        // 判断是否存在 language 对应的 PostfixProvider
        if (!this.singletons[key]) {
            this.singletons[key] = value;
        }
        return this.singletons[key];
    }
}
