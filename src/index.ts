import { User } from './models/User';

const user = new User({ id: 1 });

/** This will run the events.on() function. */
user.on('change', () => {
  console.log(user) ;
});

// user.set({name: 'new noo foo'});

user.fetch();