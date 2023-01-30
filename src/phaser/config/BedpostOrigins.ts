import { ArrBedpost } from '../../react/functions/arrival/genArrRoute';
import { MasterGameConfig } from './GameConfig';

export function getBedpostOrigin(arrBedpost: ArrBedpost) {
  const relativeBedpostOrigins = {
    [ArrBedpost.BOXUM]: new Phaser.Math.Vector2(0.236, 0),
    [ArrBedpost.NUBER]: new Phaser.Math.Vector2(0.043, 0.605),
    [ArrBedpost.LINNG]: new Phaser.Math.Vector2(0.637, 0.967),
    [ArrBedpost.IMEBA]: new Phaser.Math.Vector2(0.828, 0.189),
    [ArrBedpost.RAGID]: new Phaser.Math.Vector2(0.908, 0.346),
  };

  return relativeBedpostOrigins[arrBedpost].scale(MasterGameConfig.height);
}
