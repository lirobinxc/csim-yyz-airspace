import { AcType } from './AircraftTypes';

// WAYPOINT DATA object
export interface WaypointDataDepAll {
  name: WaypointNamesDepAll;
  relativeCoord: Phaser.Math.Vector2;
  getDisplayCoord: () => Phaser.Math.Vector2;
  type: AcType;
}
export interface WaypointDataDepCommon extends WaypointDataDepAll {
  name: WaypointNamesDepCommon;
}
export interface WaypointDataDep06s extends WaypointDataDepAll {
  name: WaypointNamesDep06s;
}
export interface WaypointDataDep24s extends WaypointDataDepAll {
  name: WaypointNamesDep24s;
}
export interface WaypointDataDep33s extends WaypointDataDepAll {
  name: WaypointNamesDep33s;
}
export interface WaypointDataDep15s extends WaypointDataDepAll {
  name: WaypointNamesDep15s;
}

// WAYPOINT
export type WaypointDictDepAll = Record<
  WaypointNamesDepAll,
  WaypointDataDepAll
>;
export type WaypointDictDepCommon = Record<
  WaypointNamesDepCommon,
  WaypointDataDepCommon
>;
export type WaypointDictDep06s = Record<
  WaypointNamesDep06s,
  WaypointDataDep06s
>;
export type WaypointDictDep24s = Record<
  WaypointNamesDep24s,
  WaypointDataDep24s
>;
export type WaypointDictDep33s = Record<
  WaypointNamesDep33s,
  WaypointDataDep33s
>;
export type WaypointDictDep15s = Record<
  WaypointNamesDep15s,
  WaypointDataDep15s
>;

export type WaypointNamesDepAll =
  | WaypointNamesDep06s
  | WaypointNamesDep24s
  | WaypointNamesDep15s
  | WaypointNamesDep33s;

type WaypointNamesDep06s = WaypointNamesDep06sUnique | WaypointNamesDepCommon;
type WaypointNamesDep24s = WaypointNamesDep24sUnique | WaypointNamesDepCommon;
type WaypointNamesDep15s = WaypointNamesDep15sUnique | WaypointNamesDepCommon;
type WaypointNamesDep33s = WaypointNamesDep33sUnique | WaypointNamesDepCommon;

type WaypointNamesDepCommon =
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

type WaypointNamesDep06sUnique =
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

type WaypointNamesDep24sUnique =
  | 'BISTI'
  | 'GAGPO'
  | 'MATES'
  | 'MAVAN'
  | 'MURNO'
  | 'NAMGI'
  | 'SAVUR'
  | 'SEKIT'
  | 'TILAM';

type WaypointNamesDep15sUnique =
  | 'BORUX'
  | 'BOVAL'
  | 'ETLER'
  | 'IPSOT'
  | 'KODAL'
  | 'VIBNA';

type WaypointNamesDep33sUnique =
  | 'BOTIB'
  | 'DUVAK'
  | 'IGTUL'
  | 'NUBAN'
  | 'NUBAX'
  | 'SERPI'
  | 'TANGU'
  | 'TETAD'
  | 'VIVET';
