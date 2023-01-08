import _ from 'lodash';
import { AcType } from '../../phaser/types/AircraftTypes';
import { RadarSceneKeys } from '../../phaser/types/SceneKeys';
import { SATELLITE_COLLECTION } from '../data/satelliteCollection';

export function genSatRoute(radarScene: RadarSceneKeys, acType: AcType) {
  if (!SATELLITE_COLLECTION[radarScene]) return;

  const selectedRoutes = SATELLITE_COLLECTION[radarScene][acType];
  const randomRoute = _.sample(selectedRoutes);

  if (randomRoute) {
    return randomRoute;
  } else {
    throw new Error('Problem generating a Satellite route.');
  }
}
