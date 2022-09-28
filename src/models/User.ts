import { AxiosResponse } from 'axios';

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
   * The get syntax binds an object property to a function that 
   * will be called when that property is looked up.
   */
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');

    if(typeof id !== 'number')  {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    })
  }
}