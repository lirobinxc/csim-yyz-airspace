/**
 * No mutation: Returns a new array.
 */
export function insertIntoArray(arr: any[], index: number, newItem: any) {
  return [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];
}
