/** 
 * AxiosPromise is a Typescript data definition that can be used
 * in a RESTful call that returns a response as a promise.  */
 import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

/**
 * In order to make sure that Typescript knows that the generic we use 
 * a generic constraint so any use of class Sync needs to have an 
 * id property.  We extend T with an interface that has an id of type number.
 */
export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  /**
   * We use axios to make a xhr call with get() that will return a promise
   * of user data at some future point.  We import the AxioPromise data type.
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