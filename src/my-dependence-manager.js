const observerStack = [];
const targetStack = [];
let nowObserver = null;
let nowTarget = null;
let nowHandle = null;
const dependenceManger = {
  /**
   * 存储observable和handle之间的映射关系 
   */
  _store: {},

  _addObserver(obId) {
    this._store[obId] = this._store[obId] || {};
    this._store[obId].target = nowTarget;
    this._store[obId].watchers = this._store[obId].watchers || [];
    // 当一个函数中多次使用同一个observable，去重处理
    if (this._store[obId].watchers.indexOf(nowObserver) === -1) {
      this._store[obId].watchers.push(nowObserver);
    }
  },

  /**
   * 依赖修改，触发observer
   * @param obId 
   */
  trigger(obId) {
    const ds = this._store[obId];
    if (ds && ds.watchers) {
      ds.watchers.forEach(observer => {
        nowHandle = observer;
        ds.target ? observer.call(ds.target) : observer()
        nowHandle = null;
      })
    }
  },

  /**
   * 开始收集依赖
   */
  startCollect(observer, target) {
    observerStack.push(observer);
    targetStack.push(target);
    nowObserver = observerStack[observerStack.length - 1];
    nowTarget = targetStack[targetStack.length - 1];
  },

  /**
   * 收集依赖
   * @param {String} obId 依赖id
   */
  collect(obId) {
    if (nowObserver) {
      this._addObserver(obId);
    } else if (!this._store[obId] && nowHandle) {
      // 当Observable被访问时，但依赖关系不存在，则添加依赖
      nowObserver = nowHandle;
      this._addObserver(obId);
      nowObserver = null;
    }
  },

  /**
   * 依赖收集完成
   */
  endCollect(target) {
    observerStack.pop();
    nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
    if (target) {
      targetStack.pop();
      nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    }
  },
}

export default dependenceManger;