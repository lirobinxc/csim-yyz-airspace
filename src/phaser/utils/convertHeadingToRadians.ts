export function convertHeadingToRadians(heading: number): number {
  let newHeading = heading;

  if (heading > 270 && heading <= 360) {
    newHeading = heading - 450;
  } else newHeading = newHeading - 90;
  const radians = newHeading * 0.0174533;
  return radians;
}
