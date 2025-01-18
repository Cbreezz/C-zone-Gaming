import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const mainVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  
  const totalVideos = 4;

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

  const handleVideoSwitch = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const nextIndex = (currentIndex % totalVideos) + 1;
    
    gsap.to(nextVideoRef.current, {
      opacity: 1,
      duration: 1,
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
        gsap.set(nextVideoRef.current, { opacity: 0 });
      }
    });
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {!isVideoLoaded && (
        <img
          src="thumbnails/hero.jpg"
          alt="Hero"
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      )}
      
      {/* Video Container with scaling wrapper */}
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 md:h-full md:w-full">
        <div className="relative h-full w-full">
          {/* Main Video with responsive scaling */}
          <video
            ref={mainVideoRef}
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.5] object-cover md:scale-100"
          />
          
          {/* Next Video with same responsive scaling */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc((currentIndex % totalVideos) + 1)}
            muted
            playsInline
            loop
            className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.5] object-cover opacity-0 md:scale-100"
          />
        </div>
      </div>
      
      {/* Video Switch Button */}
      <div 
        onClick={handleVideoSwitch}
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/30 bg-black/20 transition-transform hover:scale-110 md:h-40 md:w-40">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/50 md:h-32 md:w-32">
            <span className="text-base text-white md:text-2xl">Next</span>
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-40 bg-black/20">
        {/* Top Section */}
        <div className="mt-16 px-5 md:mt-24 md:px-10">
          <h1 className="font-special text-4xl font-bold text-white md:text-7xl">
            C-ZO<b>N</b>E
          </h1>
          <p className="mt-4 max-w-md text-sm text-white md:mt-5 md:text-lg">
            Be a Part of the Community <br /> Join us
          </p>
          <Button
            title="Watch trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex-center gap-1 mt-4"
          />
        </div>
        
        {/* Bottom Section */}
        <h1 className="absolute bottom-5 right-5 font-special text-2xl font-bold text-white md:text-5xl">
          P<b>O</b>DCAST
        </h1>
      </div>
    </div>
  );
};

export default Hero;