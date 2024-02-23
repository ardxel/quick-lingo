import { useState } from "react";

type RenderForceState = readonly [any, () => void];

export const useRenderForce = (): RenderForceState => {
  const [renderKey, setRenderKey] = useState(0);

  return [renderKey, () => setRenderKey((prev) => prev + 1)];
};
