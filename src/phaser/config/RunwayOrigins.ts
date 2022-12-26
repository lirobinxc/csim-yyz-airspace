import Phaser from 'phaser';
import {
  DepRunwayAll,
  DepRunwayYHM,
  DepRunwayYKF,
  DepRunwayYKZ,
  DepRunwayYTZ,
  DepRunwayYYZ,
  DepRunwayYZD,
} from '../types/AircraftTypes';
import { GameObjectOptions } from '../types/GameObjectOptions';

/**
 * Returns Vector2 properties for each
 * runway's origin. Call this object
 * in the init() phase or later.
 *
 * @date 12/24/2022 - 3:14:41 PM
 *
 * @export
 * @class RunwayOrigins
 * @typedef {RunwayOrigins}
 */

export default class RunwayOrigins {
  private scene: Phaser.Scene;

  public YYZ: {
    Rwy05_23: Phaser.Math.Vector2;
    Rwy06L_24R: Phaser.Math.Vector2;
    Rwy15L_33R: Phaser.Math.Vector2;
    Rwy33L_15R: Phaser.Math.Vector2;
  };
  public YTZ: {
    Rwy08_26: Phaser.Math.Vector2;
  };
  public YZD: {
    Rwy15_33: Phaser.Math.Vector2;
  };
  public YKZ: {
    Rwy15_33: Phaser.Math.Vector2;
  };
  public YHM: {
    Rwy12_30: Phaser.Math.Vector2;
  };
  public YKF: {
    Rwy08_26: Phaser.Math.Vector2;
  };

  constructor(scene: Phaser.Scene, { isDebug = false }: GameObjectOptions) {
    this.scene = scene;

    const cameraHeight = scene.cameras.main.height;

    // Property Setup: YYZ runway origins
    const RELATIVE_ORIGINS = {
      YYZ: {
        Rwy05_23: new Phaser.Math.Vector2(0.487, 0.489),
        Rwy06L_24R: new Phaser.Math.Vector2(0.513, 0.51),
        Rwy15L_33R: new Phaser.Math.Vector2(0.492, 0.499),
        Rwy33L_15R: new Phaser.Math.Vector2(0.503, 0.497),
      },
      YTZ: {
        Rwy08_26: new Phaser.Math.Vector2(0.664, 0.582),
      },
      YZD: {
        Rwy15_33: new Phaser.Math.Vector2(0.634, 0.457),
      },
      YKZ: {
        Rwy15_33: new Phaser.Math.Vector2(0.728, 0.35),
      },
      YHM: {
        Rwy12_30: new Phaser.Math.Vector2(0.176, 0.966),
      },
      YKF: {
        Rwy08_26: new Phaser.Math.Vector2(-0.1, 0.581),
      },
    };

    this.YYZ = {
      Rwy05_23: RELATIVE_ORIGINS.YYZ.Rwy05_23.scale(cameraHeight),
      Rwy06L_24R: RELATIVE_ORIGINS.YYZ.Rwy06L_24R.scale(cameraHeight),
      Rwy15L_33R: RELATIVE_ORIGINS.YYZ.Rwy15L_33R.scale(cameraHeight),
      Rwy33L_15R: RELATIVE_ORIGINS.YYZ.Rwy33L_15R.scale(cameraHeight),
    };
    this.YTZ = {
      Rwy08_26: RELATIVE_ORIGINS.YTZ.Rwy08_26.scale(cameraHeight),
    };
    this.YZD = {
      Rwy15_33: RELATIVE_ORIGINS.YZD.Rwy15_33.scale(cameraHeight),
    };
    this.YKZ = {
      Rwy15_33: RELATIVE_ORIGINS.YKZ.Rwy15_33.scale(cameraHeight),
    };
    this.YHM = {
      Rwy12_30: RELATIVE_ORIGINS.YHM.Rwy12_30.scale(cameraHeight),
    };
    this.YKF = {
      Rwy08_26: RELATIVE_ORIGINS.YKF.Rwy08_26.scale(cameraHeight),
    };

    if (isDebug) {
      this.debug();
    }
  }

  getOrigin(runway: DepRunwayAll) {
    // YYZ
    if (runway === DepRunwayYYZ.RWY_05 || runway === DepRunwayYYZ.RWY_23) {
      return this.YYZ.Rwy05_23;
    }
    if (runway === DepRunwayYYZ.RWY_06L || runway === DepRunwayYYZ.RWY_24R) {
      return this.YYZ.Rwy06L_24R;
    }
    if (runway === DepRunwayYYZ.RWY_15L || runway === DepRunwayYYZ.RWY_33R) {
      return this.YYZ.Rwy15L_33R;
    }
    if (runway === DepRunwayYYZ.RWY_33L || runway === DepRunwayYYZ.RWY_15R) {
      return this.YYZ.Rwy33L_15R;
    }
    // Satellites
    if (runway === DepRunwayYTZ.RWY_08 || runway === DepRunwayYTZ.RWY_26) {
      return this.YTZ.Rwy08_26;
    }
    if (runway === DepRunwayYZD.RWY_15 || runway === DepRunwayYZD.RWY_33) {
      return this.YZD.Rwy15_33;
    }
    if (runway === DepRunwayYKZ.RWY_15 || runway === DepRunwayYKZ.RWY_33) {
      return this.YKZ.Rwy15_33;
    }
    if (runway === DepRunwayYHM.RWY_12 || runway === DepRunwayYHM.RWY_30) {
      return this.YHM.Rwy12_30;
    }
    if (runway === DepRunwayYKF.RWY_08 || runway === DepRunwayYKF.RWY_26) {
      return this.YKF.Rwy08_26;
    }
    throw new Error(`Failed getting runway origin coordinates for ${runway}`);
  }

  debug() {
    const CIRCLE_RADIUS = 2;
    const CIRCLE_COLOR = 0xff0000;
    const CIRCLE_DEPTH = 999;

    const originPoints: Phaser.Math.Vector2[] = [];
    const airports = [
      this.YYZ,
      this.YTZ,
      this.YKZ,
      this.YZD,
      this.YHM,
      this.YKF,
    ];

    airports.forEach((airport) => {
      for (const [rwy, coord] of Object.entries(airport)) {
        originPoints.push(coord);
      }
    });

    originPoints.forEach((coord) => {
      this.scene.add
        .circle(coord.x, coord.y, CIRCLE_RADIUS, CIRCLE_COLOR)
        .setDepth(CIRCLE_DEPTH);
    });
  }
}
