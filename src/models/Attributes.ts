/**
 * Attributes stores a data object and has methods that 
 * get, getAll and saves that data.
 */
export class Attributes<T> {
  constructor(private data: T) {}

  /**
   * We set up a generic constraint on the arguments that get() can receive.
   * Here we are saying that they can only be keys (K) that are part of T (object).
   * K can only be a key of T
   * We are using the Typescript feature that strings can be types and therefore
   * keys of an object (strings) can be types also.
   * The return value is in the syntax of a regular object - object of T at key of K.
   */
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  set = (update: T): void => {
    /** 
     * The Object.assign() method takes 2 objects as arguments.  
     * It takes all of the properties of the second object and copies
     * them over into the first object.  If a property already 
     * exists then it overrides it.
     */    
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }

}
