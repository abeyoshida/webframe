import {Eventing} from './Eventing';
import { Sync } from './Sync';

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

  constructor(private data: UserProps) {}

  get(propName: string): (string | number)   {
    return this.data[propName];
  }

  set(update: UserProps): void {
    /** 
     * The Object.assign() method takes 2 objects as arguments.  
     * It takes all of the properties of the second object and copies
     * them over into the first object.  If a property already 
     * exists then it overrides it.
     */    
    Object.assign(this.data, update);
  }

 
}