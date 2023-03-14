import _ from 'lodash';
import { SimOptions } from '../state/slices/simOptionsSlice';

export function genRandomWindData(): SimOptions['windData'] {
  const windSpeeds = [20, 30];

  return {
    Radar06sScene: {
      direction: _.sample([40, 50, 60, 70, 80]) || 60,
      speed: _.sample(windSpeeds) || 20,
    },
    Radar15sScene: {
      direction: _.sample([130, 140, 150, 160, 170]) || 150,
      speed: _.sample(windSpeeds) || 20,
    },
    Radar24sScene: {
      direction: _.sample([220, 230, 240, 250, 260]) || 240,
      speed: _.sample(windSpeeds) || 20,
    },
    Radar33sScene: {
      direction: _.sample([310, 320, 330, 340, 350]) || 330,
      speed: _.sample(windSpeeds) || 20,
    },
  };
}
