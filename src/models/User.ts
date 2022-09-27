import {Eventing} from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

export interface UserProps {
  /** The ? after the property name makes the propery optional. */
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  /**
   * Hard coding an events instance for use in User.
   */
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  /**
   * Since we want to be able to pass in UserProps into User when we create 
   * an instance of User we need to initialize attributes in the constructor.
   */
  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  /**
   * Create a reference to the this.event.on() function using get.
   */
  get on() {
    return this.events.on;
  }
}