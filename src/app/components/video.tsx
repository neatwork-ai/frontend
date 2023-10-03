import { useEffect, useRef, useState } from "react";

interface AutoPlayVideoProps {
  filename?: string;
  poster?: string;
}

export function AutoPlayVideo({
  filename = "/demos/neatcoder_showcase.mp4",
  poster = "/path/to/your/neatcoder_showcase_thumb.jpg"
}: AutoPlayVideoProps) {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const [playFailed, setPlayFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

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
    <video
      // className="shadow-strong rounded-md autoPlayVideo"
      preload="metadata"
      className={`rounded-md autoPlayVideo ${isLoaded ? "shadow-strong" : ""}`}
      poster={poster}
      onLoadedData={handleLoaded}
      autoPlay muted playsInline
    >
      <source src={filename} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
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
  
