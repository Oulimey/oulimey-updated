import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Prevent context menu on the container
    const preventContextMenu = (e) => e.preventDefault();
    containerRef.current?.addEventListener('contextmenu', preventContextMenu);
    
    // Prevent drag events
    const preventDrag = (e) => e.preventDefault();
    document.addEventListener('dragstart', preventDrag);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      containerRef.current?.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDrag);
    };
  }, []);

  const handleVideoLoad = () => {
    if (isMobile) {
      setTimeout(() => {
        setLoading(false);
        if (videoRef.current) {
          videoRef.current.loop = true;
          videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
        }
      }, 4000);
    } else {
      setLoading(false);
      if (videoRef.current) {
        videoRef.current.loop = true;
        videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
      }
    }
  };

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        setLoading(false);
        if (videoRef.current) {
          videoRef.current.loop = true;
          videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
        }
      }, 4000);
    }
  }, [isMobile]);

  useGSAP(() => {
    let ctx = gsap.context(() => {
      if (!isMobile) {
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
      } else {
        gsap.set("#video-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Common media protection styles
  const mediaProtectionStyles = {
    pointerEvents: 'none',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
  };

  // Common media protection props
  const mediaProtectionProps = {
    draggable: false,
    onContextMenu: (e) => e.preventDefault(),
    controlsList: "nodownload nofullscreen noremoteplayback",
    disablePictureInPicture: true,
    disableRemotePlayback: true,
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-dvh w-screen overflow-x-hidden bg-cream-50"
      onContextMenu={(e) => e.preventDefault()}
    >
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-cream-50">
          <div className="flex items-center justify-center">
            <img 
              src="img/logo.png" 
              alt="Loading Logo"
              className={`h-auto ${isMobile ? 'w-20' : 'w-40'} animate-logo-fade`}
            />
          </div>
        </div>
      )}
      
      <div
        id="video-frame"
        className={`relative z-10 h-dvh w-screen overflow-hidden bg-black ${isMobile ? '' : 'rounded-lg'}`}
        style={{ clipPath: isMobile ? 'none' : undefined }}
      >
        <div className="relative h-full w-full">
          {!isMobile && (
            <>
              <div className="absolute inset-0 z-10">
                <img
                  src="img/hero-bg.webp"
                  alt="Hero Background"
                  className="h-full w-full object-cover"
                  {...mediaProtectionProps}
                  style={mediaProtectionStyles}
                />
              </div>

              <div className="absolute z-20 flex h-full w-full items-center justify-end pr-4">
                <video
                  ref={videoRef}
                  src="videos/titles.mp4"
                  muted
                  playsInline
                  className="h-1/2 w-auto"
                  style={{ ...mediaProtectionStyles, objectFit: 'contain' }}
                  {...mediaProtectionProps}
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </>
          )}

          {isMobile && (
            <div className="flex h-full flex-col">
              <div className="flex h-1/2 w-full items-center justify-center">
                <video
                  ref={videoRef}
                  src="videos/titles.mp4"
                  muted
                  playsInline
                  className="h-full w-full"
                  style={{ ...mediaProtectionStyles, objectFit: 'contain' }}
                  {...mediaProtectionProps}
                  onLoadedData={handleVideoLoad}
                />
              </div>

              <div className="h-1/2 w-full">
                <img
                  src="img/hero-bg.webp"
                  alt="Hero Background"
                  className="h-full w-full object-cover"
                  {...mediaProtectionProps}
                  style={mediaProtectionStyles}
                />
              </div>
            </div>
          )}
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-cream-50 drop-shadow-xl">
          A DEC<b>A</b>DE OF C<b>O</b>DING
        </h1>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        A DEC<b>A</b>DE OF C<b>O</b>DING
      </h1>
    </div>
  );
};

export default Hero;