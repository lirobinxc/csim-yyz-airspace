import { AcType } from './AircraftTypes';

export interface WaypointDataAllDep {
  name: WaypointNamesAllDep;
  relativeCoord: Phaser.Math.Vector2;
  getDisplayCoord: () => Phaser.Math.Vector2;
  type: AcType;
}
export interface WaypointDataCommonDep extends WaypointDataAllDep {
  name: WaypointNamesCommonDep;
}
export interface WaypointData06sDep extends WaypointDataAllDep {
  name: WaypointNamesRwy06sDep;
}
export interface WaypointData24sDep extends WaypointDataAllDep {
  name: WaypointNamesRwy24sDep;
}
export interface WaypointData33sDep extends WaypointDataAllDep {
  name: WaypointNamesRwy33sDep;
}
export interface WaypointData15sDep extends WaypointDataAllDep {
  name: WaypointNamesRwy15sDep;
}

export type WaypointKeysAllDep = Record<
  WaypointNamesAllDep,
  WaypointDataAllDep
>;
export type WaypointKeys06sDep = Record<
  WaypointNamesRwy06sDep,
  WaypointData06sDep
>;
export type WaypointKeys24sDep = Record<
  WaypointNamesRwy24sDep,
  WaypointData24sDep
>;
export type WaypointKeys33sDep = Record<
  WaypointNamesRwy33sDep,
  WaypointData33sDep
>;
export type WaypointKeys15sDep = Record<
  WaypointNamesRwy15sDep,
  WaypointData15sDep
>;
export type WaypointKeysCommonDep = Record<
  WaypointNamesCommonDep,
  WaypointDataCommonDep
>;

export type WaypointNamesAllDep =
  | WaypointNamesRwy06sDep
  | WaypointNamesRwy24sDep
  | WaypointNamesRwy15sDep
  | WaypointNamesRwy33sDep;

export type WaypointNamesRwy06sDep =
  | WaypointNamesRwy06sDepUnique
  | WaypointNamesCommonDep;
export type WaypointNamesRwy24sDep =
  | WaypointNamesRwy24sDepUnique
  | WaypointNamesCommonDep;
export type WaypointNamesRwy15sDep =
  | WaypointNamesRwy15sDepUnique
  | WaypointNamesCommonDep;
export type WaypointNamesRwy33sDep =
  | WaypointNamesRwy33sDepUnique
  | WaypointNamesCommonDep;

export type WaypointNamesCommonDep =
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

type WaypointNamesRwy06sDepUnique =
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

type WaypointNamesRwy24sDepUnique =
  | 'BISTI'
  | 'GAGPO'
  | 'MATES'
  | 'MAVAN'
  | 'MURNO'
  | 'NAMGI'
  | 'SAVUR'
  | 'SEKIT'
  | 'TILAM';

type WaypointNamesRwy15sDepUnique =
  | 'BORUX'
  | 'BOVAL'
  | 'ETLER'
  | 'IPSOT'
  | 'KODAL'
  | 'VIBNA';

type WaypointNamesRwy33sDepUnique =
  | 'BOTIB'
  | 'DUVAK'
  | 'IGTUL'
  | 'NUBAN'
  | 'NUBAX'
  | 'SERPI'
  | 'TANGU'
  | 'TETAD'
  | 'VIVET';
