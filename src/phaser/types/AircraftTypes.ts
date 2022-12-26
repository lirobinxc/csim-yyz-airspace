export enum AcType {
  JET = 'JET',
  PROP = 'PROP',
}

export enum AcWTC {
  L,
  M,
  H,
  S,
}

export enum AcModel {
  A21N = 'A21N',
  A343 = 'A343',
  DH8D = 'DH8D',
  B738 = 'B738',
}

export type DepRunwayAll =
  | DepRunwayYYZ
  | DepRunwayYTZ
  | DepRunwayYKZ
  | DepRunwayYZD
  | DepRunwayYHM
  | DepRunwayYKF;

export enum DepRunwayYYZ {
  RWY_05 = 'YYZ Rwy 05',
  RWY_06L = 'YYZ Rwy 06L',
  RWY_23 = 'YYZ Rwy 23',
  RWY_24R = 'YYZ Rwy 24R',
  RWY_15L = 'YYZ Rwy 15L',
  RWY_15R = 'YYZ Rwy 15R',
  RWY_33L = 'YYZ Rwy 33L',
  RWY_33R = 'YYZ Rwy 33R',
}

export enum DepRunwayYTZ {
  RWY_08 = 'YTZ Rwy 08',
  RWY_26 = 'YTZ Rwy 26',
}

export enum DepRunwayYZD {
  RWY_15 = 'YZD Rwy 15',
  RWY_33 = 'YZD Rwy 33',
}

export enum DepRunwayYKZ {
  RWY_15 = 'YKZ Rwy 15',
  RWY_33 = 'YKZ Rwy 33',
}

export enum DepRunwayYHM {
  RWY_12 = 'YHM Rwy 12',
  RWY_30 = 'YHM Rwy 30',
}

export enum DepRunwayYKF {
  RWY_08 = 'YKF Rwy 08',
  RWY_26 = 'YKF Rwy 26',
}
