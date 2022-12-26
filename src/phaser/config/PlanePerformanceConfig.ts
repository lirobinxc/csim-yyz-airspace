import { PlanePerformance } from '../objects/Plane/Plane';
import { AcModel } from '../types/AircraftTypes';

export const PlanePerformanceConfig: {
  [key in AcModel]: PlanePerformance;
} = {
  A21N: {
    speed: {
      initialClimb: 150, // to 5000 feet
      normalClimb: 210, // 5000 to FL240
      cruise: 360,
    },
    climbRate: {
      initialClimb: 35, // hundred feet per minute
      normalClimb: 15,
    },
    accel: 0.0012, // knots per second
  },
  A343: {
    speed: {
      initialClimb: 175, // to 5000 feet
      normalClimb: 290, // 5000 to FL240
      cruise: 490,
    },
    climbRate: {
      initialClimb: 14, // hundred feet per minute
      normalClimb: 13,
    },
    accel: 0.0012, // knots per second
  },
  B738: {
    speed: {
      initialClimb: 165, // to 5000 feet
      normalClimb: 290, // 5000 to FL240
      cruise: 460,
    },
    climbRate: {
      initialClimb: 30, // hundred feet per minute
      normalClimb: 20,
    },
    accel: 0.0012, // knots per second
  },
  DH8D: {
    speed: {
      initialClimb: 150, // to 5000 feet
      normalClimb: 210, // 5000 to FL240
      cruise: 360,
    },
    climbRate: {
      initialClimb: 35, // hundred feet per minute
      normalClimb: 14,
    },
    accel: 0.0012, // knots per second
  },
};
