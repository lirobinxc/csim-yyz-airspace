import _ from 'lodash';
import { AcType } from '../../../engine/types/AircraftTypes';
import { RadarSceneKeys } from '../../../engine/types/SceneKeys';
import { sidsCollection } from '../../data/sidsCollection';

export function genDepRoute(runwayId: RadarSceneKeys, acType: AcType) {
  if (!sidsCollection[runwayId]) return;

  const selectedSidsArr = sidsCollection[runwayId][acType];
  const randomRoute = _.sample(selectedSidsArr);

  return randomRoute;
}
