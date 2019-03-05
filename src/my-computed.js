import dependenceManger from './my-dependence-manager';

let cpIdCounter = 1;
class Computed {
  /**
   * id标识
   */
  cpId = null;
  /**
   * 真实值
   */
  value = null;
  /**
   * 包装的方法本体
   */
  getter = null;
  /**
   * 包装的方法的实例
   * @type {null}
   */
  target = null;
  /**
   * 依赖收集标识
   */
  hasBindAutoReCompute = false;
  constructor(getter) {
    this.cpId = 'cpId-' + (cpIdCounter++);
    this.getter = getter;
  }

  /**
   * 依赖的属性发生变化的时候调用的函数
   */
  _reCompute() {
    this.value = this.getter.call(this.target);
    // 触发外部依赖的observer
    dependenceManger.trigger(this.cpId);
  }

  /**
   * 收集computed内部的依赖
   */
  _bindAutoReCompute() {
    if (!this.hasBindAutoReCompute) {
      this.hasBindAutoReCompute = true;
      dependenceManger.startCollect(this._reCompute, this);
      this._reCompute();
      dependenceManger.endCollect(this)
    }
  }

  get() {
    //收集内部依赖
    this._bindAutoReCompute();
    dependenceManger.collect(this.cpId);
    return this.value;
  }
}

export default Computed;