export class Singleton {
  private static _instance: any;
  public static getSingletonInstance<T>(...params: unknown[]): T {
    let Instance: any = this;
    if (!Instance._instance) {
      Instance._instance = new Instance(...params);
    }
    return Instance._instance;
  }
}
