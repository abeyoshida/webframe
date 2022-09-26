/** 
 * AxiosResponse is a Typescript data definition that can be used
 * in a RESTful call that returns a response as a promise.  */
import axios, { AxiosResponse } from 'axios';

interface UserProps {
  /** The ? after the property name makes the propery optional. */
  id?: number;
  name?: string;
  age?: number;
}

export class User {
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

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');
    
    /** 
     * If a user exists then use a put request to save new data to an existing user.
     * If a user does not exit then use a post request without an ID and
     * create a new record.  Axios will automatically generate an ID for a new record.
     */
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      // post
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}