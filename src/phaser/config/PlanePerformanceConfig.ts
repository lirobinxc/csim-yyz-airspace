import { AcModel } from '../types/AircraftTypes';
import { PlanePerformance } from '../types/PlaneInterfaces';

const BASE_ACCEL = 3; // kts per second

// NOTE: Initial Climb rates should be MINIMUM 2000.

export const PlanePerformanceConfig: {
  [key in AcModel]: PlanePerformance;
} = {
  A21N: {
    speed: {
      initialClimb: 150, // kts, to 800 feet
      normalClimb: 210, // kts, 800 to FL240
      maxCruise: 340,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 2100, // feet per minute
      normalClimb: 1600,
    },
    accel: BASE_ACCEL,
  },
  A343: {
    speed: {
      initialClimb: 175, // to 800 feet
      normalClimb: 290, // 800 to FL240
      maxCruise: 470,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 2100, // feet per minute
      normalClimb: 1600,
    },
    accel: BASE_ACCEL,
  },
  B738: {
    speed: {
      initialClimb: 165, // to 800 feet
      normalClimb: 290, // 800 to FL240
      maxCruise: 440,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 3000, // feet per minute
      normalClimb: 2000,
    },
    accel: BASE_ACCEL,
  },
  B744: {
    speed: {
      initialClimb: 200, // to 800 feet
      normalClimb: 300, // 800 to FL240
      maxCruise: 490,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 2200, // feet per minute, actual = 1500
      normalClimb: 1500,
    },
    accel: BASE_ACCEL,
  },
  C208: {
    speed: {
      initialClimb: 115, // to 800 feet
      normalClimb: 130, // 800 to FL240
      maxCruise: 160,
      maxBelow10k: 160,
    },
    climbRate: {
      initialClimb: 800, // feet per minute
      normalClimb: 600,
    },
    accel: BASE_ACCEL,
  },
  C25A: {
    speed: {
      initialClimb: 145, // to 800 feet
      normalClimb: 230, // 800 to FL240
      maxCruise: 410,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 800, // feet per minute
      normalClimb: 600,
    },
    accel: BASE_ACCEL,
  },
  C56X: {
    speed: {
      initialClimb: 145, // to 800 feet
      normalClimb: 270, // 800 to FL240
      maxCruise: 410,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 2500, // feet per minute
      normalClimb: 2500,
    },
    accel: BASE_ACCEL,
  },
  CL60: {
    speed: {
      initialClimb: 160, // to 800 feet
      normalClimb: 260, // 800 to FL240
      maxCruise: 440,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 4000, // feet per minute
      normalClimb: 2500,
    },
    accel: BASE_ACCEL,
  },
  CRJ9: {
    speed: {
      initialClimb: 165, // to 800 feet
      normalClimb: 290, // 800 to FL240
      maxCruise: 430,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 2500, // feet per minute
      normalClimb: 2000,
    },
    accel: BASE_ACCEL,
  },
  DH8A: {
    speed: {
      initialClimb: 130, // to 800 feet
      normalClimb: 200, // 800 to FL240
      maxCruise: 230,
      maxBelow10k: 230,
    },
    climbRate: {
      initialClimb: 2500, // feet per minute
      normalClimb: 1500,
    },
    accel: BASE_ACCEL,
  },
  DH8D: {
    speed: {
      initialClimb: 150, // to 800 feet
      normalClimb: 210, // 800 to FL240
      maxCruise: 270,
      maxBelow10k: 250,
    },
    climbRate: {
      initialClimb: 3000, // feet per minute
      normalClimb: 1500,
    },
    accel: BASE_ACCEL,
  },
};
