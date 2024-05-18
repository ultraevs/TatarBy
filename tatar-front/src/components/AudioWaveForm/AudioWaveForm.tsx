import React, { useRef, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { useWavesurfer } from "@wavesurfer/react";
import mp3 from "../../assets/mp3/sample-15s.mp3";

const AudioWaveForm = () => {
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 44,
    width: "100%",
    waveColor: "rgba(255, 255, 255, 0.1)",
    progressColor: "rgba(255, 255, 255, 0.3)",
    url: mp3,
    barWidth: 5,
    barGap: 4,
    barRadius: 5,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);
  return (
    <>
      <div style={{display: "flex", background: "red",}}>
      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <div
          ref={containerRef}
          style={{
            width: 270,
            height: 44,
            padding: "0px 32px",
          }}
        ></div>
        
      </div>
    </>
  );
};

export { AudioWaveForm };
