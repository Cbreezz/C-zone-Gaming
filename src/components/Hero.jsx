import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const mainVideoRef = useRef(null);

  useEffect(() => {
    if (mainVideoRef.current) {
      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mainVideoRef.current.play();
          } else {
            mainVideoRef.current.pause();
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });

      observer.observe(mainVideoRef.current);

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current.onloadeddata = () => {
        setLoading(false);
      };
    }
  }, []);

  const getVideoSrc = (isMobile) => {
    return isMobile ? `videos/hero-1-mobile.mp4` : `videos/hero-1.mp4`;
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <video
        ref={mainVideoRef}
        src={getVideoSrc(isMobile)}
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
    </div>
  );
};

export default Hero;
