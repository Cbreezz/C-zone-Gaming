import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const mainVideoRef = useRef(null);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

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

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
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
  });

  const getVideoSrc = (index, isMobile) => {
    const baseSrc = `videos/hero-${index}`;
    return isMobile ? `${baseSrc}-mobile.mp4` : `${baseSrc}.mp4`;
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1, isMobile)}
                  loop
                  muted
                  playsInline
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex, isMobile)}
            loop
            muted
            playsInline
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />
          <video
            ref={mainVideoRef}
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex, isMobile)}
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

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        P<b>O</b>DCAST
      </h1>
    </div>
  );
};

export default Hero;
