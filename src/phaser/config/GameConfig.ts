export const GameConfig = {
  height: 1080,
  fps: 1, // should be 0.25
  isDebug: false,
};

export const DebugGameConfig: typeof GameConfig = {
  ...GameConfig,
  fps: 1,
  isDebug: true,
};
