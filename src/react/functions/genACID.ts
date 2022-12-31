import _ from 'lodash';
import { AcModel } from '../../phaser/types/AircraftTypes';

export enum AcWTC {
  L = 'L',
  M = 'M',
  H = 'H',
  S = 'S',
}

export enum AcType {
  Jet = 'Jet',
  Prop = 'Prop',
}

export interface AircraftCollection {
  [AcWTC.L]: { [AcType.Jet]: never[]; [AcType.Prop]: string[] };
  [AcWTC.M]: {
    [AcType.Jet]: string[];
    [AcType.Prop]: string[];
  };
  [AcWTC.H]: { [AcType.Jet]: string[]; [AcType.Prop]: never[] };
}

const aircraftCollection: AircraftCollection = {
  L: { Jet: [], Prop: [AcModel.C208] },
  M: {
    Jet: [AcModel.CRJ9, AcModel.A21N, AcModel.B738, AcModel.CL60, AcModel.C56X],
    Prop: [AcModel.DH8A, AcModel.DH8D],
  },
  H: { Jet: [AcModel.A343, AcModel.B744], Prop: [] },
};

export type ACID = ReturnType<typeof genACID>;

export function genACID() {
  let wtc: AcWTC = AcWTC.M;
  let acType: AcType = AcType.Jet;
  let equipment = 'X';

  const num1to10 = _.random(1, 10);

  // Generate WTC
  if (num1to10 > 7) {
    wtc = AcWTC.H;
  } else if (num1to10 > 1) {
    wtc = AcWTC.M;
  } else {
    wtc = AcWTC.L;
  }

  // Generate equipment type
  if (num1to10 > 1) {
    equipment = _.sample(['X', 'R', 'G']) || 'X';
  } else {
    equipment = 'S';
  }

  if (wtc === AcWTC.H) acType = AcType.Jet;
  if (wtc === AcWTC.M && num1to10 > 4) acType = AcType.Jet;
  if (wtc === AcWTC.M && num1to10 <= 4) acType = AcType.Prop;
  if (wtc === AcWTC.L) acType = AcType.Prop;

  const model = _.sample(aircraftCollection[wtc][acType]);

  let isQ400 = model === 'DH8D' ? true : false;

  const ACID = {
    model,
    wtc,
    type: acType,
    equipment,
    isQ400,
  };

  return ACID;
}
