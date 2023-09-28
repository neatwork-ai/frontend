// components/AutoPlayVideo.js
function AutoPlayVideo() {
  return (
    <video className="shadow-strong rounded-md" width="50%" height="auto" autoPlay muted loop>
      <source src="/demos/neatcoder_showcase.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default AutoPlayVideo;
