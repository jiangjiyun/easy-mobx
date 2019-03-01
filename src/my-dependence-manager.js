const observerStack = [];
let nowObserver = null;
const dependenceManger = {
  /**
   * 存储observable和handle之间的映射关系 
   */
  _store: {},
  
  _addObserver(obId){
    this._store[obId] = this._store[obId] || {};
    this._store[obId].watchers = this._store[obId].watchers || [];
    this._store[obId].watchers.push(nowObserver);
  },

  /**
   * 依赖修改，触发observer
   * @param obId 
   */
  trigger(obId){
    const ds = this._store[obId];
    if(ds && ds.watchers){
      ds.watchers.forEach(observer=>{
        observer();
      })
    }
  },

  /**
   * 开始收集依赖
   */
  startCollect(observer){
    observerStack.push(observer);
    nowObserver = observerStack[observerStack.length - 1];
  },

  /**
   * 收集依赖
   * @param {String} obId 依赖id
   */
  collect(obId){
    if(nowObserver){
      this._addObserver(obId);
    }
  },

  /**
   * 依赖收集完成
   */
  endCollect(){
    observerStack.pop();
    nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
  },
}

export default dependenceManger;