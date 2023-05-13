const PIXELS_PER_MILE = 19.83333;

export function convertPixelsToMiles(pixels: number) {
  return pixels / PIXELS_PER_MILE;
}
