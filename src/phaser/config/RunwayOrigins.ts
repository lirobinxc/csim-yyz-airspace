import Phaser from 'phaser';
import RadarScene from '../scenes/RadarScene';
import {
  DepRunwayAll,
  DepRunwaySatArrivals,
  DepRunwayYHM,
  DepRunwayYKF,
  DepRunwayYKZ,
  DepRunwayYTZ,
  DepRunwayYYZ,
  DepRunwayYZD,
} from '../types/AirportTypes';

/**
 * Returns Vector2 properties for each
 * runway's origin. Call this object
 * in the init() phase or later.
 */

export default class RunwayOrigins {
  private Scene: RadarScene;
  private CoordinateDots: Phaser.GameObjects.Layer;

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
  public ArrivalOrigins: {
    YHM: Phaser.Math.Vector2;
    YKZ_YOO_YPQ: Phaser.Math.Vector2;
  };

  constructor(scene: RadarScene) {
    // Common setup:
    this.Scene = scene;
    this.CoordinateDots = new Phaser.GameObjects.Layer(scene);

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
        Rwy08_26: new Phaser.Math.Vector2(-0.3, 0.636),
      },
      ArrivalOrigins: {
        YHM: new Phaser.Math.Vector2(1.4, 0),
        YKZ_YOO_YPQ: new Phaser.Math.Vector2(-0.3, 0.6),
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
    this.ArrivalOrigins = {
      YHM: RELATIVE_ORIGINS.ArrivalOrigins.YHM.scale(cameraHeight),
      YKZ_YOO_YPQ:
        RELATIVE_ORIGINS.ArrivalOrigins.YKZ_YOO_YPQ.scale(cameraHeight),
    };

    this.drawCoordinates();
  }

  public getOrigin(runway: DepRunwayAll) {
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
    if (runway === DepRunwaySatArrivals.YHM) {
      return this.ArrivalOrigins.YHM;
    }
    if (runway === DepRunwaySatArrivals.YKZ_YOO_YPQ) {
      return this.ArrivalOrigins.YKZ_YOO_YPQ;
    }

    throw new Error(`Failed getting runway origin coordinates for ${runway}`);
  }

  public showDots() {
    if (!this.CoordinateDots) return;

    this.CoordinateDots.setVisible(true);
  }

  public hideDots() {
    if (!this.CoordinateDots) return;

    this.CoordinateDots.setVisible(false);
  }

  private drawCoordinates() {
    const DOT_RADIUS = 2;
    const DOT_COLOR = 0xff0000;
    const DOT_DEPTH = 999;

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
      for (const [, coord] of Object.entries(airport)) {
        originPoints.push(coord);
      }
    });

    originPoints.forEach((coord) => {
      const dot = new Phaser.GameObjects.Arc(
        this.Scene,
        coord.x,
        coord.y,
        DOT_RADIUS,
        0,
        360,
        false,
        DOT_COLOR
      );

      this.CoordinateDots.add(dot);
    });

    this.CoordinateDots.setDepth(DOT_DEPTH);
    this.Scene.add.existing(this.CoordinateDots);
  }
}
