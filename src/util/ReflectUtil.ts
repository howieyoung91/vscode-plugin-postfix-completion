export default class ReflectUtil {
  private constructor() {}
  public static NewObjectFromConstructor<T>(
    target: new (...args: any[]) => T
  ): T {
    const paramtypes = Reflect.getMetadata("design:paramtypes", target);
    const params = paramtypes.map((paramType: new (...args: any[]) => T) => {
      new paramType();
    });
    return new target(...params);
  }
}
