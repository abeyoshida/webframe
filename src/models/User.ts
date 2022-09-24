interface UserProps {
  /** The ? after the property name makes the propery optional. */
  name?: string;
  age?: number;
}

/** Type alias for a function that has no arguments and no return value. */
type Callback = () => void;

export class User {
  /** 
   * Events property that will be an object that stores events.
   * It will have keys that have an array of callback functions.
  */
  events: { [key: string]: Callback[] } = {};

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

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;
    
    handlers.forEach(callback => {
      callback();
    });
  }
}