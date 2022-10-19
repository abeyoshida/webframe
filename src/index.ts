import { User } from './models/User';
import { UserForm } from './views/UserForm';

const user = User.buildUser({name: 'NAME', age: 20});

const userForm = new UserForm(document.getElementById('root'));
userForm.render();

// const collection = User.buildUserCollection();
// collection.on('change', () => {
//   console.log(collection);
// });
// collection.fetch();

/**
 * To create a new user pass in a name and/or age but no id.
 */
// const user = User.buildUser({ id: 1 });

/** 
 * This will run the events.on() function. 
 * user.on is a reference to the on() method in Eventing.
 * The parens that follow invokes the on method in Eventing
 * and not the get on() method in User.  This is the difference
 * between creating a reference to a function and directly invoking a function.
 * */
// user.on('change', () => {
//   console.log(user) ;
// });
// user.fetch();

