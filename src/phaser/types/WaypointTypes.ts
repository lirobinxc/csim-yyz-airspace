import { AcType } from './AircraftTypes';

export interface WaypointDataAll {
  name: WaypointNamesAll;
  relativeCoord: Phaser.Math.Vector2;
  getDisplayCoord: () => Phaser.Math.Vector2;
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
export interface WaypointData33s extends WaypointDataAll {
  name: WaypointNamesRwy33s;
}

export type WaypointKeysAll = Record<WaypointNamesAll, WaypointDataAll>;
export type WaypointKeys06s = Record<WaypointNamesRwy06s, WaypointData06s>;
export type WaypointKeys24s = Record<WaypointNamesRwy24s, WaypointData24s>;
export type WaypointKeys33s = Record<WaypointNamesRwy33s, WaypointData33s>;
export type WaypointKeysCommon = Record<
  WaypointNamesCommon,
  WaypointDataCommon
>;

export type WaypointNamesAll =
  | WaypointNamesRwy06s
  | WaypointNamesRwy24s
  | WaypointNamesRwy15s
  | WaypointNamesRwy33s;

export type WaypointNamesRwy06s =
  | WaypointNamesRwy06sUnique
  | WaypointNamesCommon;
export type WaypointNamesRwy24s =
  | WaypointNamesRwy24sUnique
  | WaypointNamesCommon;
export type WaypointNamesRwy15s =
  | WaypointNamesRwy15sUnique
  | WaypointNamesCommon;
export type WaypointNamesRwy33s =
  | WaypointNamesRwy33sUnique
  | WaypointNamesCommon;

export type WaypointNamesCommon =
  | 'ALKUT'
  | 'ANCOL'
  | 'AVROS'
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
  | 'PUTON'
  | 'RIGUS'
  | 'RIKEM'
  | 'SEDOG'
  | 'TANGI'
  | 'TESUK'
  | 'TEVAD'
  | 'TONNY'
  | 'TULEK'
  | 'URSAL'
  | 'VERDO'
  | 'BIMTI' // Start of satellite points
  | 'DAVSI'
  | 'ILUSI'
  | 'MUXIG'
  | 'MUXIG'
  | 'OO'
  | 'ROKTO'
  | 'SANIN'
  | 'SAXIL'
  | 'TALEB'
  | 'UDMIK'
  | 'UKPAG'
  | 'YFD'
  | 'YHM'
  | 'YKF'
  | 'YKZ'
  | 'YWT'
  | 'YYZ';

type WaypointNamesRwy06sUnique =
  | 'ANCOL'
  | 'BIRLI'
  | 'DUVKO'
  | 'GOTIM'
  | 'KEDSI'
  | 'KODAL'
  | 'MEMPA'
  | 'MOBEL'
  | 'OMAPA'
  | 'PERLO'
  | 'SIDVU'
  | 'VIDRA';

type WaypointNamesRwy24sUnique =
  | 'BISTI'
  | 'GAGPO'
  | 'MATES'
  | 'MAVAN'
  | 'MURNO'
  | 'NAMGI'
  | 'SAVUR'
  | 'SEKIT'
  | 'TILAM';

type WaypointNamesRwy15sUnique =
  | 'BORUX'
  | 'BOVAL'
  | 'ETLER'
  | 'IPSOT'
  | 'KODAL'
  | 'VIBNA';

type WaypointNamesRwy33sUnique =
  | 'BOTIB'
  | 'DUVAK'
  | 'IGTUL'
  | 'NUBAN'
  | 'NUBAX'
  | 'SERPI'
  | 'TANGU'
  | 'TETAD'
  | 'VIVET';
