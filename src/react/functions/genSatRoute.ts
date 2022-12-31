import _ from 'lodash';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { satelliteCollection } from '../data/satelliteCollection';

import { AcType } from './genACID';

export function genSatRoute(runwayId: RadarSceneKeys, acType: AcType) {
  if (!satelliteCollection[runwayId]) return;

  const selectedRoutes = satelliteCollection[runwayId][acType];
  const randomRoute = _.sample(selectedRoutes);

  if (randomRoute) {
    return randomRoute;
  } else {
    throw new Error('Problem generating a Satellite route.');
  }
}
