import _ from 'lodash';

export enum WTC {
  Light = 'L',
  Medium = 'M',
  Heavy = 'H',
  Super = 'S',
}

export enum AcType {
  Jet = 'Jet',
  Prop = 'Prop',
}

export interface AircraftCollection {
  [WTC.Light]: { [AcType.Jet]: never[]; [AcType.Prop]: string[] };
  [WTC.Medium]: {
    [AcType.Jet]: string[];
    [AcType.Prop]: string[];
  };
  [WTC.Heavy]: { [AcType.Jet]: string[]; [AcType.Prop]: never[] };
}

const aircraftCollection: AircraftCollection = {
  L: { Jet: [], Prop: ['C208'] },
  M: {
    Jet: ['CRJ9', 'A310', 'A320', 'B738'],
    Prop: ['DH8A', 'DH8D'],
  },
  H: { Jet: ['A343', 'B744', 'B763'], Prop: [] },
};

export type ACID = ReturnType<typeof genACID>;

export function genACID() {
  let wtc: WTC = WTC.Medium;
  let acType: AcType = AcType.Jet;
  let equipment = 'X';

  const num1to10 = _.random(1, 10);

  // Generate WTC
  if (num1to10 > 7) {
    wtc = WTC.Heavy;
  } else if (num1to10 > 1) {
    wtc = WTC.Medium;
  } else {
    wtc = WTC.Light;
  }

  // Generate equipment type
  if (num1to10 > 1) {
    equipment = _.sample(['X', 'R', 'G']) || 'X';
  } else {
    equipment = 'S';
  }

  if (wtc === WTC.Heavy) acType = AcType.Jet;
  if (wtc === WTC.Medium && num1to10 > 4) acType = AcType.Jet;
  if (wtc === WTC.Medium && num1to10 <= 4) acType = AcType.Prop;
  if (wtc === WTC.Light) acType = AcType.Prop;

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
