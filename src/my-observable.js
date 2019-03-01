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
    this.obId = 'obId-' + (++obIdCounter);
    this.value = v;
  }

  get() {
    dependenceManger.collect(this.obId);
    return this.value;
  }

  set(v) {
    this.value = v;
    dependenceManger.trigger(this.obId);
  }
}

export default Observable;