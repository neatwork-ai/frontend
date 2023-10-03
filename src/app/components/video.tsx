function AutoPlayVideo({ filename = "/demos/neatcoder_showcase.mp4" }) {
  return (
    <video className="shadow-strong rounded-md autoPlayVideo" autoPlay muted loop>
      <source src={filename} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default AutoPlayVideo;