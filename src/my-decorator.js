import Observable from './my-observable';

/**
 * 包装 observable 属性
 * @param target
 * @param key
 * @param descriptor
 * @returns {{enumerable: boolean, configurable: boolean, get: get, set: set}}
 */
function observable(target, key, descriptor) {
  // descriptor 是一个PropertyDescriptor，就是我们用于defineProperty时的那个东西。
  // 当装饰器用于类属性时，descriptor有一个initializer属性，类型是函数，在类构造函数执行时，initializer返回的值作为属性的值。
  const v = descriptor.initializer;
  const observable = new Observable(v);
  return {
    enumerable: true,
    configurable: true,
    get() {
      return observable.get()
    },
    set(v) {
      observable.set(v);
    }
  }
}

export {
  observable
};