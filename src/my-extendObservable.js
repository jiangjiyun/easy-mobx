import Observable from './my-observable';

const createObservableProperty = function (target, property) {
  const observable = new Observable(target[property]);
  Object.defineProperty(target, property, {
    get() {
      return observable.get();
    },
    set(v) {
      return observable.set(v);
    }
  });
  //递归包装 observable
  if (typeof target[property] === 'object') {
    for (let i in target[property]) {
      if (target[property].hasOwnProperty(i)) {
        createObservableProperty(target[property], i);
      }
    }
  }
}

const createObservable = function (target) {
  for (let i in target) {
    if (target.hasOwnProperty(i)) {
      createObservableProperty(target, i);
    }
  }
}

export {
  createObservable
}