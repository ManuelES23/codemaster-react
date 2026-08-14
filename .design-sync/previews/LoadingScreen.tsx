import { LoadingScreen, MotionGlobalConfig } from "codemaster-react";

MotionGlobalConfig.skipAnimations = true;

// LoadingScreen is a `fixed inset-0` overlay, so it contributes no flow height
// and the card measured 0px. The sized wrapper gives the card real height on
// its own black ground; the overlay then fills it.
export const Default = () => (
  <div style={{ minHeight: 700, background: "#000000" }}>
    <LoadingScreen />
  </div>
);
