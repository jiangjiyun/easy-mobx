import autorun from '../src/my-autorun';
import {
  observable
} from '../src/my-decorator';


class Person {
  @observable name;
  constructor(name) {
    this.name = name;
  }
}

let person = new Person('jjy');

autorun(function(){
  console.log('run', person.name);
});

setTimeout(()=>{
  person.name = '98k';
},200);