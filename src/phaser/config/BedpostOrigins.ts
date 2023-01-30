import { ArrBedpost } from '../../react/functions/arrival/genArrRoute';
import { MasterGameConfig } from './GameConfig';

export function getBedpostOrigin(arrBedpost: ArrBedpost) {
  const relativeBedpostOrigins = {
    [ArrBedpost.BOXUM]: new Phaser.Math.Vector2(0.314, 0.133),
    [ArrBedpost.NUBER]: new Phaser.Math.Vector2(0.043, 0.605),
    [ArrBedpost.LINNG]: new Phaser.Math.Vector2(0.625, 0.883),
    [ArrBedpost.IMEBA]: new Phaser.Math.Vector2(0.828, 0.189),
    [ArrBedpost.RAGID]: new Phaser.Math.Vector2(0.908, 0.346),
  };
  console.log(arrBedpost);

  return relativeBedpostOrigins[arrBedpost].scale(MasterGameConfig.height);
}
