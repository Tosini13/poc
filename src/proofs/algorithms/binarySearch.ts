/**
 *
 * @todo
 * search without sorting!
 */

export const binarySearch = <ValueType>(
  arr: Array<ValueType>,
  value: ValueType
): number | null => {
  let start = 0;
  let end = arr.length - 1;
  arr.sort();

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (arr[middle] === value) {
      return middle;
    } else if (arr[middle] < value) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return null;
};
