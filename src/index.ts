import { User } from './models/User';

/**
 * To create a new user pass in a name and/or age but no id.
 */
const user = new User({ id: 1, name: 'newerNameFoo', age: 1 });

/** This will run the events.on() function. */
user.on('save', () => {
  console.log(user) ;
});

user.set({name: 'new noo foo'});

user.save();


console.log(user.fetch());
