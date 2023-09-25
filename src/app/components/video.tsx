// components/AutoPlayVideo.js
function AutoPlayVideo() {
  return (
    <video width="100%" height="auto" autoPlay muted loop>
      <source src="/demos/scaffold.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default AutoPlayVideo;
