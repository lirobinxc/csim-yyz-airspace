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

export type WaypointKeysAll = Record<WaypointNamesAll, WaypointDataAll>;
export type WaypointKeys06s = Record<WaypointNamesRwy06s, WaypointData06s>;
export type WaypointKeys24s = Record<WaypointNamesRwy24s, WaypointData24s>;

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
  | 'VERDO'
  | 'BIMTI' // Start of satellite points
  | 'DAVSI'
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
  | 'YKZ'
  | 'YWT'
  | 'YYZ';

type WaypointNamesRwy06sUnique =
  | 'ALKUT'
  | 'ANCOL'
  | 'AVROS'
  | 'BIRLI'
  | 'DUVKO'
  | 'GOTIM'
  | 'KEDSI'
  | 'KODAL'
  | 'MEMPA'
  | 'MOBEL'
  | 'OMAPA'
  | 'PERLO'
  | 'PUTON'
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
  | 'BOVAL'
  | 'VIBNA'
  | 'IPSOT'
  | 'BORUX'
  | 'ETLER'
  | 'ALKUT'
  | 'PUTON'
  | 'KODAL';

type WaypointNamesRwy33sUnique =
  | 'NUBAX'
  | 'TANGU'
  | 'TETAD'
  | 'SERPI'
  | 'VIVET'
  | 'NUBAN'
  | 'BOTIB'
  | 'IGTUL'
  | 'DUVAK'
  | 'AVROS'
  | 'PUTON';
