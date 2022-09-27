import { User } from './models/User';

const user = new User({ name: 'noo foo', age: 0.1 });

/** This will run the events.on() function. */
user.on('change', () => {
  console.log('change event') ;
})