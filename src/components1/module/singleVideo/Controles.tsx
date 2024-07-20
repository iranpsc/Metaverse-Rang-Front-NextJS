import { Dispatch, MutableRefObject, SetStateAction } from "react";
import ReactPlayer from "react-player";

type ControlsProps = {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  playedSeconds: number;
  duration: number;
  playerRef: MutableRefObject<ReactPlayer>;
};

const Controls = (props: ControlsProps) => {
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.playerRef.current.seekTo(+e.target.value, "seconds");
  };

  return (
    <div>
      <button onClick={() => props.setPlaying(!props.playing)}>
        {/* {props.playing ? <IoPause /> : <IoPlay />} */}
      </button>
      <input
        type="range"
        value={props.playedSeconds}
        min="0"
        max={props.duration}
        onChange={seek}
      />
    </div>
  );
};

export default Controls;
