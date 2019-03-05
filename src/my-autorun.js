import dependenceManger from './my-dependence-manager';

function autorun(handle) {
  dependenceManger.startCollect(handle);
  handle();
  dependenceManger.endCollect();
}

export default autorun;