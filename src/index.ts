import { User } from './models/User';

const user = new User({ name: 'noo foo', age: 0.1 });

user.events.on('change', () => {
  console.log('change!');
});

user.events.trigger('change');