import _ from 'lodash';
import { AcType } from '../../phaser/types/AircraftTypes';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { satelliteCollection } from '../data/satelliteCollection';

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
