import React from "react";
import Beams from "./utils/Beams";

function BeamsBgLayout() {
  return (
    <div className="absolute top-0 z-[-1] opacity-7 w-full h-full">
      <Beams
        beamWidth={2.3}
        beamHeight={90}
        beamNumber={90}
        lightColor="#fffdfd"
        speed={6}
        noiseIntensity={1.1}
        scale={0.3}
        rotation={30}
      />
    </div>
  );
}

export default BeamsBgLayout;
