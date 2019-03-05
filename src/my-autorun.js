import dependenceManger from './my-dependence-manager';

export default function autorun(handle) {
  dependenceManger.startCollect(handle);
  handle();
  dependenceManger.endCollect();
}


//对autorun进行封装处理，支持react
const ReactMixin = {
  componentWillMount: function () {
    autorun(() => {
      this.render();
      this.forceUpdate();
    });
  }
};

export function observer(target) {
  const targetCWM = target.prototype.componentWillMount;
  target.prototype.componentWillMount = function () {
    targetCWM && targetCWM.call(this);
    ReactMixin.componentWillMount.call(this);
  };
}