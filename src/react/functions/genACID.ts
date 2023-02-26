import _ from 'lodash';
import { AcModel, AcType, AcWTC } from '../../phaser/types/AircraftTypes';

export interface AircraftCollection {
  [AcWTC.L]: { [AcType.JET]: AcModel[]; [AcType.PROP]: AcModel[] };
  [AcWTC.M]: {
    [AcType.JET]: AcModel[];
    [AcType.PROP]: AcModel[];
  };
  [AcWTC.H]: { [AcType.JET]: AcModel[]; [AcType.PROP]: never[] };
}

const aircraftCollection: AircraftCollection = {
  L: { JET: [AcModel.C25A], PROP: [AcModel.C208] },
  M: {
    JET: [AcModel.CRJ9, AcModel.A21N, AcModel.B738, AcModel.CL60, AcModel.C56X],
    PROP: [AcModel.DH8A, AcModel.DH8D],
  },
  H: { JET: [AcModel.A343, AcModel.B744, AcModel.B763], PROP: [] },
};

export type ACID = ReturnType<typeof genACID>;

export function genACID({ allowC208 }: { allowC208: boolean }) {
  let wtc: AcWTC = AcWTC.M;
  let acType: AcType = AcType.JET;
  let equipment = 'X';

  const num1to10 = _.random(1, 10);

  // Generate WTC
  if (num1to10 > 7) {
    wtc = AcWTC.H;
  } else if (num1to10 > 2) {
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

  if (wtc === AcWTC.H) acType = AcType.JET;
  if (wtc === AcWTC.M && num1to10 > 3) acType = AcType.JET;
  if (wtc === AcWTC.M && num1to10 <= 3) acType = AcType.PROP;
  if (wtc === AcWTC.L) acType = AcType.JET;

  let model = _.sample(aircraftCollection[wtc][acType]);

  if (!model) {
    throw new Error('Error generating an aircraft MODEL.');
  }

  let isQ400 = model === 'DH8D' ? true : false;

  // Override: Convert C208 to Q400s
  if (allowC208 === false && model === AcModel.C208) {
    model = AcModel.DH8D;
    wtc = AcWTC.M;
    acType = AcType.PROP;
    isQ400 = true;
  }

  const ACID = {
    model,
    wtc,
    type: acType,
    equipment,
    isQ400,
  };

  return ACID;
}
