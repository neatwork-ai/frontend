import { useEffect, useRef, useState } from "react";

interface AutoPlayVideoProps {
    filename?: string;
  }

export function AutoPlayVideo({ filename = "/demos/neatcoder_showcase.mp4" }: AutoPlayVideoProps) {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const [playFailed, setPlayFailed] = useState(false);

  useEffect(() => {
    const video = videoEl.current;
    if (video) {
      const handleLoadedData = () => {
        const promise = video.play();
        if (promise !== undefined) {
          promise.then(() => {
            // Autoplay started! Do nothing special
          }).catch(error => {
            // Autoplay was prevented. Update state so we can show a Play button or other UI.
            setPlayFailed(true);
          });
        }
      };

      video.addEventListener('loadeddata', handleLoadedData);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);


  return (
    <div className="shadow-strong rounded-md autoPlayVideo">
      <video
    className="rounded-md"
    autoPlay muted playsInline
    preload="auto"
    >
      <source src={filename} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      {playFailed && <button onClick={() => videoEl.current?.play()}>Play</button>}
    </div>
  );
}

export function useVideoControl() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return { videoRef, playVideo };
}
  