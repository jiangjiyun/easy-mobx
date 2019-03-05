import autorun from '../src/my-autorun';
import {
  observable,
  computed
} from '../src/my-decorator';

class Person {
  @observable car = '单车';
  @computed
  get name() {
    return 'mycar:' + this.car;
  }
}

let person = new Person();


autorun(function () {
  console.log('car', person.name)
  console.log('name', person.name);
});

setTimeout(() => {
  console.log('修改car');
  person.car = '单车1';
}, 200);

setTimeout(() => {
  console.log('修改car1');
  person.car = '单车2';
}, 400);