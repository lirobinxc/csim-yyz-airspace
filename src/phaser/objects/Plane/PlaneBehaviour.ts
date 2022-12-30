import { getRunwayHeading } from '../../config/RunwayHeadingConfig';
import { SidRoute06s } from '../../config/Rwy06sSidConfig';
import { Rwy06sWaypointDict } from '../../config/Rwy06sWaypointConfig';
import RadarScene from '../../scenes/RadarScene';
import { RadarSceneKeys } from '../../types/SceneKeys';
import {
  WaypointData06s,
  WaypointData24s,
  WaypointDataAll,
  WaypointNamesRwy06s,
} from '../../types/WaypointTypes';
import { asKnots } from '../../utils/asKnots';
import { convertHeadingToRadians } from '../../utils/convertHeadingToRadians';
import { convertRadiansToHeading } from '../../utils/convertRadiansToHeading';
import {
  determineLeftOrRightTurn,
  TurnDirection,
} from '../../utils/determineLeftOrRightTurn';
import { getSidRoute } from '../../utils/getSidRoute';
import Plane from './Plane';
import PlaneDataTag from './PlaneDataTag';

export default class PlaneBehaviour extends Phaser.GameObjects.GameObject {
  // Parent component + Reference components
  private Scene: RadarScene;
  private Plane: Plane;
  private DataTag: PlaneDataTag;

  constructor(plane: Plane, dataTag: PlaneDataTag) {
    super(plane.Scene, 'PlaneBehaviour');

    // Common setup
    this.Scene = plane.Scene;
    this.Plane = plane;
    this.DataTag = dataTag;
    plane.scene.add.existing(this);
  }

  preUpdate(t: number, dt: number) {
    this.ifNadp2UpTo5000();
    this.flySidHeadingAt1100();
    this.ifAbove5000();

    this.updateHeading(dt);
    this.updateAltitude(dt);
    this.updateSpeed(dt);
    this.updateClimbRate(dt);
    this.updateVelocity();

    this.updateOnCourse();
  }

  private updateOnCourse() {
    const heading = this.Plane.Commands.heading;

    // Base case
    if (heading.directTo === null || heading.directTo === undefined) return;

    // Setup:
    let sidRoute = getSidRoute(
      this.Scene.RUNWAY_CONFIG,
      this.Plane.Properties.filedData.sidName
    );

    // Logic Step 0: Set heading.assigned to the waypoint
    const WAYPOINT_POSITION = heading.directTo.getDisplayCoord();
    this.directTo(WAYPOINT_POSITION);

    // Logic Step 1: Check if a/c is close to the waypoint
    const PLANE_POSITION = this.Plane.getPosition();

    const DISTANCE_FROM_WAYPOINT = Phaser.Math.Distance.BetweenPoints(
      PLANE_POSITION,
      WAYPOINT_POSITION
    );
  }

  private directTo(wpCoord: Phaser.Math.Vector2) {
    const planeCoord = this.Plane.getPosition();

    const radiansBetweenPoints = Phaser.Math.Angle.BetweenPoints(
      planeCoord,
      wpCoord
    );
    const newHeading = convertRadiansToHeading(radiansBetweenPoints);
    const newHeadingCeil = Math.ceil(newHeading);

    this.Plane.Commands.heading.assigned = newHeadingCeil;
  }

  private updateHeading(dt: number) {
    const heading = this.Plane.Commands.heading;

    const TURN_DIRECTION = determineLeftOrRightTurn(
      heading.current,
      heading.assigned
    );

    // Base case
    if (TURN_DIRECTION === TurnDirection.NO_TURN) return;

    const TURN_RATE_PER_SEC = 3; // degrees per second (Standard Rate Turn)
    const TURN_RATE_PER_MS = TURN_RATE_PER_SEC / 1000;
    const TURN_RATE_PER_FRAME = TURN_RATE_PER_MS * dt;

    // Logic: Buffer zone
    const isWithinBufferRange =
      Math.abs(heading.current - heading.assigned) < TURN_RATE_PER_FRAME;
    if (isWithinBufferRange) {
      heading.current = heading.assigned;
      return;
    }

    // Logic: Main
    if (
      TURN_DIRECTION === TurnDirection.RIGHT ||
      TURN_DIRECTION === TurnDirection.EITHER
    ) {
      const nextHeadingUpdate = heading.current + TURN_RATE_PER_FRAME;
      if (nextHeadingUpdate > 360) {
        heading.current = nextHeadingUpdate - 360;
        return;
      }
      heading.current += TURN_RATE_PER_FRAME;
      return;
    }
    if (TURN_DIRECTION === TurnDirection.LEFT) {
      const nextHeadingUpdate = heading.current - TURN_RATE_PER_FRAME;
      if (nextHeadingUpdate <= 0) {
        heading.current = nextHeadingUpdate + 360;
        return;
      }
      heading.current -= TURN_RATE_PER_FRAME;
      return;
    }
  }

  private updateAltitude(dt: number) {
    const altitude = this.Plane.Commands.altitude; // feet

    // Base case
    if (altitude.current === altitude.assigned) {
      this.Plane.Commands.isClimbing = false;
      return;
    } else {
      this.Plane.Commands.isClimbing = true;
    }

    // Logic: Buffer zone
    const CLIMB_RATE_PER_SEC = this.Plane.Commands.climbRate.current / 60;
    const CLIMB_RATE_PER_MS = CLIMB_RATE_PER_SEC / 1000;
    const CLIMB_RATE_PER_FRAME = CLIMB_RATE_PER_MS * dt;

    const isWithinBufferRange =
      Math.abs(altitude.current - altitude.assigned) < CLIMB_RATE_PER_SEC;
    if (isWithinBufferRange) {
      altitude.current = altitude.assigned;
      return;
    }

    // Logic: Main
    if (altitude.current < altitude.assigned) {
      altitude.current += CLIMB_RATE_PER_FRAME;
      return;
    }
    if (altitude.current > altitude.assigned) {
      altitude.current -= CLIMB_RATE_PER_FRAME;
      return;
    }
  }

  private updateSpeed(dt: number) {
    const speed = this.Plane.Commands.speed; // feet
    const acPerf = this.Plane.Performance;

    // Base case
    if (speed.current === speed.assigned) return;

    // Logic: Buffer zone
    const ACCEL_PER_SEC = acPerf.accel; // kts per second
    const ACCEL_PER_MS = ACCEL_PER_SEC / 1000;
    const ACCEL_PER_FRAME = ACCEL_PER_MS * dt;

    const isWithinBufferRange =
      Math.abs(speed.current - speed.assigned) < ACCEL_PER_SEC;

    if (isWithinBufferRange) {
      speed.current = speed.assigned;
      return;
    }

    // Logic: Main
    if (speed.current < speed.assigned) {
      speed.current += ACCEL_PER_FRAME;
      return;
    }
    if (speed.current > speed.assigned) {
      speed.current -= ACCEL_PER_FRAME;
      return;
    }
  }

  private updateClimbRate(dt: number) {
    const climbRate = this.Plane.Commands.climbRate; // feet per min

    if (climbRate.current > 200) {
      this.DataTag.showVmi = true;
    } else {
      this.DataTag.showVmi = false;
    }

    // Base cases
    if (this.Plane.Commands.isClimbing === false) {
      climbRate.current = 0;
      return;
    }
    if (climbRate.current === climbRate.assigned) {
      return;
    }

    // Logic: Buffer zone
    const CLIMB_RATE_ACCEL_PER_SEC = 120;
    const CLIMB_RATE_ACCEL_PER_MS = CLIMB_RATE_ACCEL_PER_SEC / 1000;
    const CLIMB_RATE_ACCEL_PER_FRAME = CLIMB_RATE_ACCEL_PER_MS * dt;

    const isWithinBufferRange =
      Math.abs(climbRate.current - climbRate.assigned) <
      CLIMB_RATE_ACCEL_PER_SEC;

    if (isWithinBufferRange) {
      climbRate.current = climbRate.assigned;
      return;
    }

    // Logic: Main
    if (climbRate.current < climbRate.assigned) {
      climbRate.current += CLIMB_RATE_ACCEL_PER_FRAME;
      return;
    }
    if (climbRate.current > climbRate.assigned) {
      climbRate.current -= CLIMB_RATE_ACCEL_PER_FRAME;
      return;
    }
  }

  // V = speed * heading
  private updateVelocity = () => {
    const speed = this.Plane.Commands.speed;
    const heading = this.Plane.Commands.heading;

    const body = this.Plane.body as Phaser.Physics.Arcade.Body;
    const headingInRadians = convertHeadingToRadians(heading.current);

    this.scene.physics.velocityFromRotation(
      headingInRadians,
      asKnots(speed.current),
      body.velocity
    );
  };

  private flySidHeadingAt1100() {
    const altitude = this.Plane.Commands.altitude; // feet
    const heading = this.Plane.Commands.heading;

    const completedSidHeading = this.Plane.Commands.completedSidHeading;
    if (completedSidHeading === true) return;

    if (altitude.current > 1100 && !completedSidHeading) {
      heading.assigned = getRunwayHeading(
        this.Plane.Properties.takeoffData.depRunway
      ).sid;
      this.Plane.Commands.completedSidHeading = true;
    }
  }

  private ifAbove5000() {
    const altitude = this.Plane.Commands.altitude; // feet

    if (altitude.current > 5000) {
      const climbRate = this.Plane.Commands.climbRate; // feet per min
      const acPerf = this.Plane.Performance;

      climbRate.assigned = acPerf.climbRate.normalClimb;
    }
  }

  // NADP2 procedure: fast speed, low climb rate from 800 to 1000
  private ifNadp2UpTo5000() {
    const altitude = this.Plane.Commands.altitude; // feet

    // Base cases
    if (altitude.current > 5000) return;
    if (this.Plane.Properties.takeoffData.isNADP1) return;

    const climbRate = this.Plane.Commands.climbRate; // feet per min
    const speed = this.Plane.Commands.speed;
    const acPerf = this.Plane.Performance;

    // Logic
    if (altitude.current < 800) {
      climbRate.assigned = acPerf.climbRate.initialClimb;
      return;
    }
    if (altitude.current >= 800 && speed.current < acPerf.speed.maxBelow10k) {
      climbRate.assigned = Math.floor(acPerf.climbRate.initialClimb / 2);
      speed.assigned = acPerf.speed.maxBelow10k;
      return;
    }
    if (altitude.current >= 1000 && altitude.current <= 5000) {
      climbRate.assigned = acPerf.climbRate.initialClimb;
      return;
    }
  }
}
