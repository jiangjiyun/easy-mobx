import autorun from '../src/my-autorun';
import {
  observable
} from '../src/my-decorator';
import dependenceManger from '../src/my-dependence-manager';

class Person {
  @observable car = [];
}

let person = new Person();

autorun(function(){
  console.log('car', person.car && person.car[0]);
});

setTimeout(()=>{
  console.log('修改car');
  person.car = [9];
},400);


window.dependenceManger = dependenceManger;