import { copy } from "./copy";

describe("Test copy util", () => {
  const arr = [1, 2, 3, "4", null, { a: 10, b: [5, 6, 7] }] as const;
  const obj = { name: "john", info: { age: 24, text: ["a", "b", "c"] } } as const;

  test("test 'deep' and 'fast'", () => {
    expect(copy(arr, true, true)).toEqual(arr);
    expect(copy(obj, true, true)).toEqual(obj);
  });

  test("test not deep copy", () => {
    expect(copy(arr, false) !== arr).toBeTruthy();
    expect(copy(arr, false)[5].a === arr[5].a).toBeTruthy();

    expect(copy(obj, false) !== obj).toBeTruthy();
    expect(copy(obj, false).info === obj.info).toBeTruthy();
  });

  test("test slow copy", () => {
    expect(copy(arr, true, false)).toEqual(arr);
    expect(copy(obj, true, false)).toEqual(obj);
  });
});
