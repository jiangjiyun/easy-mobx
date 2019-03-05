import autorun from '../src/my-autorun';
import {
  observable
} from '../src/my-decorator';
import dependenceManger from '../src/my-dependence-manager';

class Person {
  @observable name;
  @observable car = [];
  constructor(name) {
    // this.name = name;
  }
}

let person = new Person();

autorun(function(){
  console.log('car', person.car && person.car[0]);
});

setTimeout(()=>{
  person.car = [9];
},400);


window.dependenceManger = dependenceManger;