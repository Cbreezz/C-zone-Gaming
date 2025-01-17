import gsap from "gsap";
import { useEffect, useRef } from "react";

const Hero = () => {
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
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  const getVideoSrc = (isMobile) => {
    return isMobile ? "videos/hero-1-mobile.mp4" : "videos/hero-1.mp4";
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
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

      <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
        P<b>O</b>DCAST
      </h1>

      <div className="absolute left-0 top-0 z-40 size-full">
        <div className="mt-24 px-5 sm:px-10">
          <h1 className="special-font hero-heading text-blue-100">
            C-ZO<b>N</b>E
          </h1>

          <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
            Be a Part of the Community <br /> Join us
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
