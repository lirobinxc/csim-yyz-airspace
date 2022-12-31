import _ from 'lodash';
import { RunwayId, sidsCollection } from '../data/sidsCollection';

import { AcType } from './genACID';

export function genDepRoute(runwayId: RunwayId, acType: AcType) {
  if (!sidsCollection[runwayId]) return;

  const selectedSidsArr = sidsCollection[runwayId][acType];
  const randomRoute = _.sample(selectedSidsArr);

  return randomRoute;
}
