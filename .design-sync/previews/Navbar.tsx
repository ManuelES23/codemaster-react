import { Navbar, MotionGlobalConfig } from "codemaster-react";

// Navbar slides down from y:-100 on mount; snap it to its resting position.
MotionGlobalConfig.skipAnimations = true;

// Navbar is `fixed top-0 w-full z-50`, so it pins to the top of whatever
// viewport it renders in. The wrapper supplies page-coloured space beneath it
// so the card reads as a real page header rather than a floating strip.
export const Default = () => (
  <div style={{ minHeight: 240, background: "#000000" }}>
    <Navbar />
  </div>
);
