/**
 * Creates a new object composed of the own and inherited enumerable property paths of `obj` that are not omitted.
 *
 * @example
 * const initialObject = {
 *   name: 'John',
 *   age: 30,
 *   city: 'New York',
 * };
 *
 * const updatedObject = omit(initialObject, ['age', 'city']);
 *
 * // Result: { name: 'John' }
 */
const omit = <T extends object, K extends keyof T>(obj: T, keys: Array<K>) => {
  const keysSet = new Set(keys);
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keysSet.has(key as K)) {
      return {
        ...acc,
        [key]: value,
      };
    }
    return acc;
  }, {} as Omit<T, K>);
};

export default omit;
