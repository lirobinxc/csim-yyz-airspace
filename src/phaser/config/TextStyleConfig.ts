import { AcType } from '../types/AircraftTypes';
import { setRelativeSize } from '../utils/setRelativeSize';

export enum FontColors {
  Blue = '#2f81e1ff',
  Pink = '#e54e99',
}

export function genWaypointTextStyles(
  scene: Phaser.Scene,
  acType: AcType
): Phaser.GameObjects.TextStyle {
  const styles = {
    fontFamily: 'monospace',
    fontSize: `${setRelativeSize(scene, 14)}px`,
    color: acType === AcType.JET ? FontColors.Blue : FontColors.Pink,
  } as Phaser.GameObjects.TextStyle;

  return styles;
}
