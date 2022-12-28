export function setRelativeSize(scene: Phaser.Scene, size: number) {
  const cameraHeight = scene.cameras.main.height;

  const ratio = size / 1080;

  const relativeSize = cameraHeight * ratio;

  return relativeSize;
}
