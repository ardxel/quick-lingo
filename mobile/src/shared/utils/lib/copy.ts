import { isObject, LiteralObject } from "./isObject";

/**
 * @param object - any value. if value not a literal object or array then value be just returned without changes
 * @param deep - if deep is true then invoke copy fn with recursion if value inside object will be another object.
 *	otherwise invoke copy fn with first level copy
 * @param fast - if fast is true then copied object will be created with JSON api  (not safe).
 *	otherwise copying will be execute with event loop and manually
 * @returns deep or first level copy
 * @example
 *  // will be true because deep is false
 *  const object = {a: {b: {c: 1}}}
 *  const copy1 = copy(object, false)
 *  console.log(object.b === copy1.b)
 *
 *  // will be false
 *  const array = [{a: [10]}]
 *  const copy2 = copy(array, true);
 *  console.log(array[0].a === copy2[0].a)
 *
 */
export const copy = <T extends object | Array<unknown> | LiteralObject>(object: T, deep = true, fast = true): T => {
  const isArray = Array.isArray;

  const isObj = isObject(object);
  const isArr = isArray(object);

  if (!isObj && !isArr) return object;

  if (!deep) {
    return isArr ? ([...object] as T) : ({ ...object } as T);
  }

  if (fast) {
    return JSON.parse(JSON.stringify(object)) as T;
  }

  if (isArr) {
    const arr = [] as Array<any>;
    for (let i = 0; i < object.length; i++) {
      if (isObject(object[i]) || isArray(object[i])) {
        arr[i] = copy(object[i] as T, deep, fast);
      } else {
        arr[i] = object[i];
      }
    }

    return arr as T;
  } else {
    const obj = {} as LiteralObject;
    for (const key in object) {
      if (isObject(object[key]) || isArray(object[key])) {
        obj[key] = copy(object[key] as T, deep, fast);
      } else {
        obj[key] = object[key];
      }
    }
    return obj as T;
  }
};
