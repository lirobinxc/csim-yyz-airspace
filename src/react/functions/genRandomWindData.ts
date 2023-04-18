import _ from 'lodash';
import { SimOptions } from '../state/slices/simOptionsSlice';

export function genRandomWindData(): SimOptions['windData'] {
  const windSpeeds = [20, 30];

  return {
    Radar06sScene: {
      direction: _.sample([20, 30, 40, 50, 60, 70, 80, 90, 100]) || 60,
      speed: _.sample(windSpeeds) || 20,
    },
    Radar15sScene: {
      direction: _.sample([110, 120, 130, 140, 150, 160, 170, 180, 190]) || 150,
      speed: _.sample(windSpeeds) || 20,
    },
    Radar24sScene: {
      direction: _.sample([200, 210, 220, 230, 240, 250, 260, 270, 280]) || 240,
      speed: _.sample(windSpeeds) || 20,
    },
    Radar33sScene: {
      direction: _.sample([290, 300, 310, 320, 330, 340, 350, 360, 10]) || 330,
      speed: _.sample(windSpeeds) || 20,
    },
  };
}
