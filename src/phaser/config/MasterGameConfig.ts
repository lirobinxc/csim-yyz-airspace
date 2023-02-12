export const MasterGameConfig = {
  height: 1080,
  fps: 0.25, // should be 0.25
  isDebug: false, // should be false
  speedMultipliers: [1, 2, 4, 8],
};

export const DebugGameConfig: typeof MasterGameConfig = {
  ...MasterGameConfig,
  fps: 1,
  isDebug: true,
};
