import { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

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

  /**
   * Create class methods that utilize imported methods.
   * This allows you to call the method directly from the instance variable,
   * i.e. const user = new User(UserProps);
   * user.set(updateObject);
   */

  /**
   * The set method does 2 things.  
   * 1) It updates the data property in the attributes class.
   * 2) It triggers the change event to inform other parts of the app 
   *    that data has been updated so some change might need to be done to the DOM.
   */
  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  /**
   * To fetch user data we need to coordinate getting information from
   * the Attributes and the Sync class.  First we need to get an id from
   * the attributes class.  Then, if we have an id we access the fetch method
   * on the sync class which makes an xhr call using the axios library to get
   * user data from the json-server.
   */
  fetch(): void {
    const id = this.attributes.get('id');

    if(typeof id !== 'number')  {
      throw new Error('Cannot fetch without an id');
    }

    /**
     * When we call sync.fetch it returns a promise of type AxiosResponse.
     */
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}