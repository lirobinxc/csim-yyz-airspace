import _ from 'lodash';
import { satelliteCollection } from '../data/satelliteCollection';
import { RunwayId } from '../data/sidsCollection';

import { AcType } from './genACID';

export function genSatRoute(runwayId: RunwayId, acType: AcType) {
  if (!satelliteCollection[runwayId]) return;

  const selectedSidsArr = satelliteCollection[runwayId][acType];
  const randomRoute = _.sample(selectedSidsArr);

  return randomRoute;
}
