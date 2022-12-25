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
  | 'ANCOL'
  | 'AVSEP'
  | 'BETES'
  | 'DEDKI'
  | 'DUSOM'
  | 'EBKIN'
  | 'IKLEN'
  | 'KEPTA'
  | 'KISEP'
  | 'LETOR'
  | 'MIXUT'
  | 'NADUM'
  | 'NOSIK'
  | 'NUGOP'
  | 'OAKVL'
  | 'RIGUS'
  | 'RIKEM'
  | 'SEDOG'
  | 'TANGI'
  | 'TESUK'
  | 'TEVAD'
  | 'TONNY'
  | 'TULEK'
  | 'URSAL'
  | 'VERDO';

type WaypointNamesRwy06s =
  | 'ALKUT'
  | 'ANCOL'
  | 'AVROS'
  | 'AVSEP'
  | 'BETES'
  | 'BIRLI'
  | 'DEDKI'
  | 'DUSOM'
  | 'DUVKO'
  | 'EBKIN'
  | 'GOTIM'
  | 'IKLEN'
  | 'KEDSI'
  | 'KEPTA'
  | 'KISEP'
  | 'KODAL'
  | 'LETOR'
  | 'MEMPA'
  | 'MIXUT'
  | 'MOBEL'
  | 'NADUM'
  | 'NOSIK'
  | 'NUGOP'
  | 'OAKVL'
  | 'OMAPA'
  | 'PERLO'
  | 'PUTON'
  | 'RIGUS'
  | 'RIKEM'
  | 'SEDOG'
  | 'SIDVU'
  | 'TANGI'
  | 'TESUK'
  | 'TEVAD'
  | 'TONNY'
  | 'TULEK'
  | 'URSAL'
  | 'VERDO'
  | 'VIDRA';

type WaypointNamesRwy24s =
  | 'ANCOL'
  | 'AVSEP'
  | 'BETES'
  | 'BISTI'
  | 'DAVSI'
  | 'DEDKI'
  | 'DUSOM'
  | 'EBKIN'
  | 'GAGPO'
  | 'IKLEN'
  | 'KEPTA'
  | 'KISEP'
  | 'LETOR'
  | 'MATES'
  | 'MAVAN'
  | 'MIXUT'
  | 'MURNO'
  | 'NADUM'
  | 'NAMGI'
  | 'NOSIK'
  | 'NUGOP'
  | 'OAKVL'
  | 'RIGUS'
  | 'RIKEM'
  | 'SAVUR'
  | 'SEDOG'
  | 'SEKIT'
  | 'TANGI'
  | 'TESUK'
  | 'TEVAD'
  | 'TILAM'
  | 'TONNY'
  | 'TULEK'
  | 'URSAL'
  | 'VERDO';
