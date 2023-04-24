export const MasterGameOptions = {
  appVersion: '2.7',
  height: 1080,
  fps: 0.21, // should be 0.25
  isDebug: false, // should be false
  speedMultipliers: [1, 120],
};

export const DebugGameOptions: typeof MasterGameOptions = {
  ...MasterGameOptions,
  fps: 1,
  isDebug: true,
};
