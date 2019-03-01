import dependenceManger from './my-dependence-manager';

export default function autorun(handle){
  dependenceManger.startCollect(handle);
  handle();
  dependenceManger.endCollect();
}