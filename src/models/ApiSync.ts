/** 
 * AxiosPromise is a Typescript data definition provided by axios that 
 * can be used for RESTful calls that return a response as a promise.  
 */
import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

/**
 * Sync allows us to save and fetch data from a remote server.
 * We use axios to make the xhr calls to the remote server.
 * We apply a generic constraint so any use of class Sync needs to have an 
 * id property.
 * The syntax for this occurs inside of the angle brackets.
 * We extend T with an interface that has an id of type number.
 */
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  /**
   * We use axios to make a xhr call with get() that will return a promise
   * of user data at some future point.  We import and apply the AxiosPromise 
   * data type to the data that will be returned.
   */
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    
    /** 
     * If a user exists then use a put request to save new data to an existing user.
     * If a user does not exit then use a post request without an ID and
     * create a new record.  Axios will automatically generate an ID for a new record.
     */
    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}