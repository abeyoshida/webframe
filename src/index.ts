import { User } from './models/User';

const user = new User({name: 'Abe', age: 70});


user.on('change', () => {
  console.log('change 1');
});
user.on('change', () => {
  console.log('change 2');
});
user.on('fooevent', () => {
  console.log('you are still a foo');
});

user.trigger('change');
user.trigger('fooevent');