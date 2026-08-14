import { Footer, MotionGlobalConfig } from "codemaster-react";

MotionGlobalConfig.skipAnimations = true;

// Footer lays out four columns inside `max-w-7xl`, so it needs full card width
// to read correctly — see cfg.overrides.Footer.cardMode = "column".
export const Default = () => <Footer />;
