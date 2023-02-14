import { AcType } from '../types/AircraftTypes';

export enum FontColors {
  BLUE = '#2f81e1ff',
  PINK = '#e54e99',
  GREEN = '#0ab45dff',
}

export function genWaypointTextStyles(
  type: AcType | null
): Phaser.GameObjects.TextStyle {
  let labelColor = FontColors.GREEN;

  switch (type) {
    case AcType.JET:
      labelColor = FontColors.BLUE;
      break;
    case AcType.PROP:
      labelColor = FontColors.PINK;
      break;
    default:
      break;
  }

  const styles = {
    fontFamily: 'monospace',
    fontSize: `14px`,
    color: labelColor,
  } as Phaser.GameObjects.TextStyle;

  return styles;
}
