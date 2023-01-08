import { WP_DICT_COMMON } from '../../phaser/config/CommonWaypointConfig';
import { AcType } from '../../phaser/types/AircraftTypes';
import {
  DepRunwayAll,
  DepRunwaySatArrivals,
  DepRunwayYHM,
  DepRunwayYKF,
  DepRunwayYKZ,
  DepRunwayYTZ,
  DepRunwayYYZ,
  DepRunwayYZD,
} from '../../phaser/types/AirportTypes';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { AdjacentSectors } from '../../phaser/types/SectorTypes';
import { SatelliteName } from '../../phaser/types/SidAndSatelliteTypes';
import { WaypointDataCommon } from '../../phaser/types/WaypointTypes';

export interface SatelliteData {
  name: SatelliteName;
  arrRunway: DepRunwayAll | null;
  depRunway: DepRunwayAll;
  depRoute: string;
  depPoint: string;
  destination: string;
  entryAltitude: number;
  entryHeading: number | WaypointDataCommon;
  handoffSector: AdjacentSectors;
}

type AcTypeSatRoutes = Record<AcType, SatelliteData[]>;
type SatelliteCollection = Record<RadarSceneKeys, AcTypeSatRoutes>;

const CommonSatelliteData: SatelliteData[] = [
  {
    name: SatelliteName.YHM_ARR_MUXIG,
    arrRunway: DepRunwayYHM.RWY_30,
    depRunway: DepRunwaySatArrivals.YHM,
    depRoute: '... ... ...',
    depPoint: '',
    destination: 'CYHM',
    entryAltitude: 160,
    entryHeading: WP_DICT_COMMON.YYZ,
    handoffSector: AdjacentSectors.WS,
  },
  {
    name: SatelliteName.YHM_ARR_UDMIK,
    arrRunway: DepRunwayYHM.RWY_30,
    depRunway: DepRunwaySatArrivals.YHM,
    depRoute: '... ... ...',
    depPoint: '',
    destination: 'CYHM',
    entryAltitude: 160,
    entryHeading: WP_DICT_COMMON.YYZ,
    handoffSector: AdjacentSectors.WS,
  },
  {
    name: SatelliteName.YKZ_DEP_ANCOL,
    arrRunway: null,
    depRunway: DepRunwayYKZ.RWY_15,
    depRoute: 'PERLO ... ...',
    depPoint: 'CYKZ',
    destination: 'CYOW',
    entryAltitude: 30,
    entryHeading: 210,
    handoffSector: AdjacentSectors.HM,
  },
  {
    name: SatelliteName.YKZ_DEP_BETES,
    arrRunway: null,
    depRunway: DepRunwayYKZ.RWY_15,
    depRoute: 'OAKVL ... ...',
    depPoint: 'CYKZ',
    destination: 'CYOW',
    entryAltitude: 30,
    entryHeading: 180,
    handoffSector: AdjacentSectors.HM,
  },
  {
    name: SatelliteName.YKZ_DEP_GOPUP,
    arrRunway: null,
    depRunway: DepRunwayYKZ.RWY_15,
    depRoute: 'TULEK ... ...',
    depPoint: 'CYKZ',
    destination: 'CYSB',
    entryAltitude: 30,
    entryHeading: 30,
    handoffSector: AdjacentSectors.KF,
  },
  {
    name: SatelliteName.YKZ_DEP_KEPTA,
    arrRunway: null,
    depRunway: DepRunwayYKZ.RWY_15,
    depRoute: 'MAVAN ... ...',
    depPoint: 'CYKZ',
    destination: 'KMSP',
    entryAltitude: 30,
    entryHeading: WP_DICT_COMMON.RIKEM,
    handoffSector: AdjacentSectors.GR,
  },
  {
    name: SatelliteName.YKZ_DEP_RIGUS,
    arrRunway: null,
    depRunway: DepRunwayYKZ.RWY_15,
    depRoute: 'DUSOM ... ...',
    depPoint: 'CYKZ',
    destination: 'CYOW',
    entryAltitude: 30,
    entryHeading: 180,
    handoffSector: AdjacentSectors.HM,
  },
  {
    name: SatelliteName.YKZ_DEP_SEDOG,
    arrRunway: null,
    depRunway: DepRunwayYKZ.RWY_15,
    depRoute: 'LAKES ... ...',
    depPoint: 'CYKZ',
    destination: 'CYFB',
    entryAltitude: 30,
    entryHeading: 30,
    handoffSector: AdjacentSectors.SI,
  },
  {
    name: SatelliteName.YKZ_DEP_TONNY,
    arrRunway: null,
    depRunway: DepRunwayYKZ.RWY_15,
    depRoute: 'TONNY ... ...',
    depPoint: 'CYKZ',
    destination: 'CYOW',
    entryAltitude: 30,
    entryHeading: 30,
    handoffSector: AdjacentSectors.VV,
  },
  {
    name: SatelliteName.YOO_ARR,
    arrRunway: null,
    depRunway: DepRunwaySatArrivals.YKZ_YOO_YPQ,
    depRoute: 'YWT YYZ OO',
    depPoint: '',
    destination: 'CYOO',
    entryAltitude: 170,
    entryHeading: WP_DICT_COMMON.YWT,
    handoffSector: AdjacentSectors.ES,
  },
  {
    name: SatelliteName.YPQ_ARR,
    arrRunway: null,
    depRunway: DepRunwaySatArrivals.YKZ_YOO_YPQ,
    depRoute: 'DAVSI ... ...',
    depPoint: '',
    destination: 'CYPQ',
    entryAltitude: 220,
    entryHeading: WP_DICT_COMMON.YWT,
    handoffSector: AdjacentSectors.ER,
  },
  {
    name: SatelliteName.YTZ_DEP_DAVSI,
    arrRunway: null,
    depRunway: DepRunwayYTZ.RWY_26,
    depRoute: 'DAVSI ... ...',
    depPoint: 'CYTZ',
    destination: '',
    entryAltitude: 30,
    entryHeading: WP_DICT_COMMON.DAVSI,
    handoffSector: AdjacentSectors.ER,
  },
  {
    name: SatelliteName.YTZ_DEP_IKLEN,
    arrRunway: null,
    depRunway: DepRunwayYTZ.RWY_26,
    depRoute: 'IKLEN ... ...',
    depPoint: 'CYTZ',
    destination: '',
    entryAltitude: 30,
    entryHeading: 60,
    handoffSector: AdjacentSectors.VV,
  },
  {
    name: SatelliteName.YTZ_DEP_MAVAN,
    arrRunway: null,
    depRunway: DepRunwayYTZ.RWY_26,
    depRoute: 'RIKEM ... ...',
    depPoint: 'CYTZ',
    destination: '',
    entryAltitude: 30,
    entryHeading: WP_DICT_COMMON.RIKEM,
    handoffSector: AdjacentSectors.GR,
  },
  {
    name: SatelliteName.YTZ_DEP_PERLO,
    arrRunway: null,
    depRunway: DepRunwayYTZ.RWY_26,
    depRoute: 'ANCOL ... ...',
    depPoint: 'CYTZ',
    destination: '',
    entryAltitude: 30,
    entryHeading: 210,
    handoffSector: AdjacentSectors.HM,
  },
  {
    name: SatelliteName.YTZ_DEP_TEVAD,
    arrRunway: null,
    depRunway: DepRunwayYTZ.RWY_26,
    depRoute: 'TEVAD ... ...',
    depPoint: 'CYTZ',
    destination: '',
    entryAltitude: 30,
    entryHeading: WP_DICT_COMMON.NADUM,
    handoffSector: AdjacentSectors.GR,
  },
  {
    name: SatelliteName.YZD_DEP_SEDOG,
    arrRunway: null,
    depRunway: DepRunwayYZD.RWY_15,
    depRoute: 'SEDOG ... ...',
    depPoint: 'CYTZ',
    destination: '',
    entryAltitude: 15,
    entryHeading: 330,
    handoffSector: AdjacentSectors.SI,
  },
];

const JetOnlySatelliteData = [
  {
    name: SatelliteName.YKF_DEP_SANIN,
    arrRunway: null,
    depRunway: DepRunwayYKF.RWY_08,
    depRoute: 'Q907 SANIN ...',
    depPoint: 'CYKF',
    destination: '',
    entryAltitude: 60,
    entryHeading: WP_DICT_COMMON.YWT,
    handoffSector: AdjacentSectors.ER,
  },
];

const PropOnlySatelliteData = [
  {
    name: SatelliteName.YKF_DEP_DAVSI,
    arrRunway: null,
    depRunway: DepRunwayYKF.RWY_08,
    depRoute: 'DAVSI TESUK ...',
    depPoint: 'CYKF',
    destination: '',
    entryAltitude: 60,
    entryHeading: WP_DICT_COMMON.YWT,
    handoffSector: AdjacentSectors.ER,
  },
];

const Rwy06OnlySatData = [
  {
    name: SatelliteName.YKZ_ARR,
    arrRunway: null,
    depRunway: DepRunwaySatArrivals.YKZ_YOO_YPQ,
    depRoute: 'DAVSI TESUK ...',
    depPoint: '',
    destination: 'YKZ',
    entryAltitude: 70,
    entryHeading: WP_DICT_COMMON.YKF,
    handoffSector: AdjacentSectors.ES,
  },
];

export const SATELLITE_COLLECTION: SatelliteCollection = {
  Radar06sScene: {
    JET: [...CommonSatelliteData, ...JetOnlySatelliteData, ...Rwy06OnlySatData],
    PROP: [
      ...CommonSatelliteData,
      ...PropOnlySatelliteData,
      ...Rwy06OnlySatData,
    ],
  },
  Radar15sScene: {
    JET: [...CommonSatelliteData, ...JetOnlySatelliteData],
    PROP: [...CommonSatelliteData, ...PropOnlySatelliteData],
  },
  Radar24sScene: {
    JET: [...CommonSatelliteData, ...JetOnlySatelliteData],
    PROP: [...CommonSatelliteData, ...PropOnlySatelliteData],
  },
  Radar33sScene: {
    JET: [
      ...CommonSatelliteData,
      ...JetOnlySatelliteData,
      {
        name: SatelliteName.YHM_DEP_UKPAG,
        arrRunway: null,
        depRunway: DepRunwayYKF.RWY_26,
        depRoute: 'UKPAG ... ...',
        depPoint: 'CYHM',
        destination: '',
        entryAltitude: 60,
        entryHeading: 60,
        handoffSector: AdjacentSectors.ER,
      },
    ],
    PROP: [
      ...CommonSatelliteData,
      ...PropOnlySatelliteData,
      {
        name: SatelliteName.YKF_DEP_DAVSI,
        arrRunway: null,
        depRunway: DepRunwayYKF.RWY_26,
        depRoute: 'UKPAG ... ...',
        depPoint: 'CYHM',
        destination: '',
        entryAltitude: 60,
        entryHeading: 60,
        handoffSector: AdjacentSectors.ER,
      },
    ],
  },
};
