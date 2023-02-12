import { ArrBedpost } from '../../react/functions/arrival/genArrRoute';
import { MasterGameConfig } from './MasterGameConfig';

export function getBedpostOrigin(arrBedpost: ArrBedpost) {
  const relativeBedpostOrigins = {
    [ArrBedpost.BOXUM]: new Phaser.Math.Vector2(0.24, 0),
    [ArrBedpost.NUBER]: new Phaser.Math.Vector2(-0.02, 0.605),
    [ArrBedpost.LINNG]: new Phaser.Math.Vector2(0.634, 1),
    [ArrBedpost.IMEBA]: new Phaser.Math.Vector2(1, 0.032),
    [ArrBedpost.RAGID]: new Phaser.Math.Vector2(1, 0.314),
  };

  return relativeBedpostOrigins[arrBedpost].scale(MasterGameConfig.height);
}
