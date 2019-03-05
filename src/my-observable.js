import dependenceManger from './my-dependence-manager';

let obIdCounter = 1;
class Observable {
  /**
   * id标识
   */
  obId = null;
  /**
   * 真实值
   */
  value = null;
  constructor(v) {
    this.obId = 'obId-' + (obIdCounter++);
    if (Array.isArray(v)) {
      this._wrapArrayProxy(v);
    } else {
      this.value = v;
    }
  }

  get() {
    dependenceManger.collect(this.obId);
    return this.value;
  }

  set(v) {
    this.value = v;
    dependenceManger.trigger(this.obId);
  }

  _wrapArrayProxy(v) {
    this.value = new Proxy(v, {
      set: (target, key, value, receiver) => {
        Reflect.set(target, key, value, receiver);
        if (key !== 'length') {
          dependenceManger.trigger(this.obId);
        }
        return true;
      }
    });
  }
}

export default Observable;