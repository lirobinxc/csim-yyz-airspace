export function convertRadiansToHeading(radians: number): number {
  const degrees = radians * 57.2958 + 90;
  if (degrees.toFixed(0) === '0') return 360;
  if (degrees <= 0) {
    return degrees + 360;
  } else return degrees;
}
