export const MasterGameOptions = {
  height: 1080,
  fps: 0.25, // should be 0.25
  isDebug: false, // should be false
  speedMultipliers: [1, 40],
};

export const DebugGameOptions: typeof MasterGameOptions = {
  ...MasterGameOptions,
  fps: 1,
  isDebug: true,
};
