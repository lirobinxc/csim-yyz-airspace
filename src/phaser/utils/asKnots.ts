/**
 * Input desired KNOTS, returns
 * number for phaser speed variables
 * @date 12/25/2022 - 11:41:35 AM
 *
 * @export
 * @param {number} knots
 * @returns {number}
 */
export function asKnots(knots: number) {
  return knots / 250;
}
