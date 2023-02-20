import { AcType } from './AircraftTypes';

export interface WaypointDataArrAll {
  name: WaypointNamesArrAll;
  relativeCoord: Phaser.Math.Vector2;
  getDisplayCoord: () => Phaser.Math.Vector2;
  type: AcType | null;
}

export type WaypointDictArrCommon = Record<
  WaypointNamesArrCommon,
  WaypointDataArrCommon
>;

export interface WaypointDataArrCommon extends WaypointDataArrAll {
  name: WaypointNamesArrCommon;
}
export interface WaypointDataArr06s extends WaypointDataArrAll {
  name: WaypointNamesArr06s;
}
export interface WaypointDataArr24s extends WaypointDataArrAll {
  name: WaypointNamesArr24s;
}
export interface WaypointDataArr33s extends WaypointDataArrAll {
  name: WaypointNamesArr33s;
}
export interface WaypointDataArr15s extends WaypointDataArrAll {
  name: WaypointNamesArr15s;
}

export type WaypointDictAllArr = Record<
  WaypointNamesArrAll,
  WaypointDataArrAll
>;
export type WaypointDict06sArr = Record<
  WaypointNamesArr06s,
  WaypointDataArr06s
>;
export type WaypointDict24sArr = Record<
  WaypointNamesArr24s,
  WaypointDataArr24s
>;
export type WaypointDict33sArr = Record<
  WaypointNamesArr33s,
  WaypointDataArr33s
>;
export type WaypointDict15sArr = Record<
  WaypointNamesArr15s,
  WaypointDataArr15s
>;

export type WaypointNamesArrAll =
  | WaypointNamesArr06s
  | WaypointNamesArr24s
  | WaypointNamesArr33s
  | WaypointNamesArr15s;

type WaypointNamesArr06s = WaypointNamesArrCommon | WaypointNamesArr06sUnique;
type WaypointNamesArr24s = WaypointNamesArrCommon | WaypointNamesArr24sUnique;
type WaypointNamesArr33s = WaypointNamesArrCommon | WaypointNamesArr33sUnique;
type WaypointNamesArr15s = WaypointNamesArrCommon | WaypointNamesArr15sUnique;

type WaypointNamesArrCommon =
  | 'BOXUM'
  | 'DUVOS'
  | 'ERBUS'
  | 'IMEBA'
  | 'LINNG'
  | 'NUBER'
  | 'RAGID'
  | 'VERKO';

type WaypointNamesArr06sUnique =
  | 'BISDA'
  | 'DANIP'
  | 'DARPU'
  | 'DEBGO'
  | 'DEGRO'
  | 'DERLI'
  | 'DULPA'
  | 'DUNOP'
  | 'FAYOL'
  | 'IKBAT'
  | 'ILANI'
  | 'KEDRO'
  | 'KERPU'
  | 'KEVNO'
  | 'LERAN'
  | 'LERAT'
  | 'LITRO'
  | 'MASAR'
  | 'MODOL'
  | 'PEKMO'
  | 'PILPO'
  | 'RESES'
  | 'SEDAB'
  | 'SEGOD'
  | 'SEKOP'
  | 'SELAP'
  | 'SEMTI'
  | 'VEPNA';

type WaypointNamesArr24sUnique =
  | 'ADSED'
  | 'TASKU'
  | 'DAVIK'
  | 'LEVIG'
  | 'MIPED'
  | 'SATUR'
  | 'ROKTO'
  | 'PENGO'
  | 'MANUP'
  | 'BOTUM'
  | 'YOUTH'
  | 'BIMPO'
  | 'MAROD'
  | 'DEKNI'
  | 'DAVNO'
  | 'DUNOL'
  | 'LEPUX'
  | 'DUGDA'
  | 'CALVY'
  | 'OMTOK'
  | 'DENKA'
  | 'AMILU'
  | 'EBDAL'
  | 'NOAHA';

type WaypointNamesArr33sUnique =
  | 'ROKTO'
  | 'PENGO'
  | 'KENPU'
  | 'REVOV'
  | 'NOXER'
  | 'ALORU'
  | 'DANAV'
  | 'ALMAX'
  | 'MERKI'
  | 'IKMEX'
  | 'ERBAN'
  | 'APMAM'
  | 'RIDOD'
  | 'AGBEK'
  | 'LETAG'
  | 'VIDRO'
  | 'ELVUT'
  | 'NUBAV'
  | 'MIRUG'
  | 'GUBOV'
  | 'OKOKU'
  | 'MAVID'
  | 'KEDSU';

type WaypointNamesArr15sUnique =
  | 'BLOOS'
  | 'PILKI'
  | 'HOFFS'
  | 'ONGOX'
  | 'BEFNI'
  | 'WOHIL'
  | 'ROKTO'
  | 'PENGO'
  | 'PIGSO'
  | 'PILNI'
  | 'IGTUL'
  | 'GADOG'
  | 'TAGAT'
  | 'LOBNU'
  | 'YOUTH'
  | 'VIDRO'
  | 'TOVOP'
  | 'DENPI'
  | 'MIRUG'
  | 'MITUX'
  | 'OMTIP'
  | 'KASIT'
  | 'MEVPO';
