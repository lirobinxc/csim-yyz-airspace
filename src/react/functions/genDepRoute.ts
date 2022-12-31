import _ from 'lodash';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { sidsCollection } from '../data/sidsCollection';

import { AcType } from './genACID';

export function genDepRoute(runwayId: RadarSceneKeys, acType: AcType) {
  if (!sidsCollection[runwayId]) return;

  const selectedSidsArr = sidsCollection[runwayId][acType];
  const randomRoute = _.sample(selectedSidsArr);

  return randomRoute;
}
