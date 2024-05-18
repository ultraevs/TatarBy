import React, { useRef, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { useWavesurfer } from "@wavesurfer/react";
import Play from "../../assets/svg/Play.svg";
import Pause from "../../assets/svg/Pause.svg";

type Props = {
  url: string;
};

const AudioWaveForm = ({ url }: Props) => {
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 34,
    width: "100%",
    waveColor: "rgba(255, 255, 255, 0.1)",
    progressColor: "rgba(255, 255, 255, 0.3)",
    cursorWidth: 0,
    url: url,
    barWidth: 5,
    barGap: 4,
    barRadius: 5,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);
  
  return (
    <div className={styles.audioForm}>
      <button onClick={onPlayPause}>
        <img src={isPlaying ? Pause : Play} alt="playPause icon" />
      </button>
      <div
        ref={containerRef}
        style={{
          width: 167,
          height: 34,
        }}
      ></div>
    </div>
  );
};

export { AudioWaveForm };
