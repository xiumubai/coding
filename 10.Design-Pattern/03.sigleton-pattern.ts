/**
 * @author 疯不皮
 * @param {T extends new (...args: any[]) => any} oldConstructor 一个需要创建实例的单例类
 * @returns proxyConstructor
 * @description 单例模式,生成一个唯一实例
 */

// T extends new (...args: any[] 确保T是一个构造函数
function singletonPattern<T extends new (...args: any[]) => any>(oldConstructor: T): T {
  let onlyInstance: InstanceType<T>;

  const proxyConstructor: T = new Proxy(oldConstructor, {
    construct(target, args) {
      if (!onlyInstance) {
        onlyInstance = Reflect.construct(target, args);
      }
      return onlyInstance;
    },
  });

  return proxyConstructor;
}
