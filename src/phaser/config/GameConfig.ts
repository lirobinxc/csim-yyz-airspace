export const GameConfig = {
  height: 1080,
  fps: 0.25,
  isDebug: false,
};

export const DebugGameConfig: typeof GameConfig = {
  ...GameConfig,
  fps: 1,
  isDebug: true,
};
