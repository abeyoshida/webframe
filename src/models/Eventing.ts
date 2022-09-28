/** Type alias for a function that has no arguments and no return value. */
type Callback = () => void;

export class Eventing {
  /** 
   * Events property that will be an object that stores events.
   * The value of each key will be an array of callback functions.
  */
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;
    
    handlers.forEach(callback => {
      callback();
    });
  }
}