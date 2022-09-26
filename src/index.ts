import { User } from './models/User';

const user = new User({ name: 'noo foo', age: 0.1 });

user.save();