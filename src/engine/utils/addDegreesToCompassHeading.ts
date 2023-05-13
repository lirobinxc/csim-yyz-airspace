export function addDegreesToCompassHeading(
  currentHeading: number,
  degreesToAdd: number
): number {
  const sum = currentHeading + degreesToAdd;

  if (sum <= 360) {
    return sum;
  } else {
    const actualHeading = sum - 360;
    return actualHeading;
  }
}
