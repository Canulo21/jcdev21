import React from "react";
import Beams from "./utils/Beams";

function BeamsBgLayout() {
  return (
    <div className="absolute top-0 z-[-1] opacity-7 w-full h-full">
      <Beams
        beamWidth={4.3}
        beamHeight={10}
        beamNumber={10}
        lightColor="#fffdfd"
        speed={4}
        noiseIntensity={1.1}
        scale={0.2}
        rotation={30}
      />
    </div>
  );
}

export default BeamsBgLayout;
