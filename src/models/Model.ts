import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  /**
   * Create a pass through method by providing a reference to
   * the this.event.on() function using the "get" accessor keyword.
   * The get syntax binds an object property to a function that 
   * will be called when that property is looked up.
   * 
   * The goal is NOT to call the on method which would require passing required arguments.
   * The goal here is to just pass a reference to the on method using the getter accessor.
   */
   get on() {
    /** 
     * There are no function parens at the end of on because we
     * are NOT calling events.on().  Instead we are passing a
     * reference.
     */
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
  set(update: T): void {
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