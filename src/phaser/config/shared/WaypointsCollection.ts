import { AcType } from '../../types/AircraftTypes';

export interface WaypointDataAll {
  name: WaypointNamesAll;
  relativeCoord: Phaser.Math.Vector2;
  type: AcType;
}
export interface WaypointDataCommon extends WaypointDataAll {
  name: WaypointNamesCommon;
}
export interface WaypointData06s extends WaypointDataAll {
  name: WaypointNamesRwy06s;
}
export interface WaypointData24s extends WaypointDataAll {
  name: WaypointNamesRwy24s;
}

export type WaypointKeysAll = Record<WaypointNamesAll, Phaser.Math.Vector2>;
export type WaypointKeys06s = Record<WaypointNamesRwy06s, Phaser.Math.Vector2>;
export type WaypointKeys24s = Record<WaypointNamesRwy24s, Phaser.Math.Vector2>;

export type WaypointNamesAll = WaypointNamesRwy06s | WaypointNamesRwy24s;

type WaypointNamesCommon =
  | 'TONNY'
  | 'EBKIN'
  | 'IKLEN'
  | 'SEDOG'
  | 'AVSEP'
  | 'URSAL'
  | 'TULEK'
  | 'DUSOM'
  | 'OAKVL'
  | 'ANCOL'
  | 'LETOR'
  | 'MIXUT'
  | 'RIKEM'
  | 'NADUM'
  | 'TESUK'
  | 'VERDO'
  | 'DEDKI';

type WaypointNamesRwy06s =
  | 'ALKUT'
  | 'ANCOL'
  | 'AVROS'
  | 'AVSEP'
  | 'BIRLI'
  | 'DEDKI'
  | 'DUSOM'
  | 'DUVKO'
  | 'EBKIN'
  | 'GOTIM'
  | 'IKLEN'
  | 'KEDSI'
  | 'KODAL'
  | 'LETOR'
  | 'MEMPA'
  | 'MIXUT'
  | 'MOBEL'
  | 'NADUM'
  | 'OAKVL'
  | 'OMAPA'
  | 'PERLO'
  | 'PUTON'
  | 'RIKEM'
  | 'SEDOG'
  | 'SIDVU'
  | 'TESUK'
  | 'TONNY'
  | 'TULEK'
  | 'URSAL'
  | 'VERDO'
  | 'VIDRA';

type WaypointNamesRwy24s =
  | 'ANCOL'
  | 'AVSEP'
  | 'BISTI'
  | 'DAVSI'
  | 'DEDKI'
  | 'DUSOM'
  | 'EBKIN'
  | 'GAGPO'
  | 'IKLEN'
  | 'LETOR'
  | 'MATES'
  | 'MAVAN'
  | 'MIXUT'
  | 'MURNO'
  | 'NADUM'
  | 'NAMGI'
  | 'OAKVL'
  | 'RIKEM'
  | 'SAVUR'
  | 'SEDOG'
  | 'SEKIT'
  | 'TESUK'
  | 'TILAM'
  | 'TONNY'
  | 'TULEK'
  | 'URSAL'
  | 'VERDO';
