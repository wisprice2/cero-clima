export function HeroVideo() {
  return (
    <video
      className="hero-image hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/hero-cero-clima.webp"
      aria-hidden="true"
      disablePictureInPicture
    >
      <source src="/videos/banner-cero-clima.mp4" type="video/mp4" />
    </video>
  );
}
