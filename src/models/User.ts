import { Model } from './Model';
import { Attributes} from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';

/**
 * This interface defines the data object that can be used to
 * instantiate a new User. All properties are optional.
 */
export interface UserProps {
  /** The ? after the property name makes the propery optional. */
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }
}