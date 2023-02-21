import { binarySearch } from "../../proofs/algorithms/binarySearch";

describe("binarySearch", () => {
  test("for empty array", () => {
    expect(binarySearch([], 5)).toEqual(null);
  });
  test("for lack of element in array", () => {
    expect(binarySearch([3, 2, 11, 1, 25, 6], 13)).toEqual(null);
  });
  test("for one element array", () => {
    expect(binarySearch([1], 1)).toEqual(0);
  });
  test("for ordered array", () => {
    expect(binarySearch([1, 2, 3, 4, 5, 6], 5)).toEqual(4);
  });
  test("for unordered array", () => {
    expect(binarySearch([3, 2, 11, 1, 25, 6], 2)).toEqual(1);
  });
});
