import { Hero, MotionGlobalConfig } from "codemaster-react";

// Hero staggers its entrance up to delay 0.9s + 0.8s duration. Snap motion to
// its final state so the card shows the settled composition (CTAs and the
// three trust badges included) instead of a mid-animation frame.
MotionGlobalConfig.skipAnimations = true;

// `min-h-screen` with `pt-20` reserved for the fixed Navbar, so it previews at
// full page height.
export const Default = () => <Hero />;
