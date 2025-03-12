import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  // Media protection configuration
  const mediaProtectionStyles = {
    pointerEvents: 'none',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
  };

  const mediaProtectionProps = {
    draggable: false,
    onContextMenu: (e) => e.preventDefault(),
  };

  // Prevent context menu and drag events
  useEffect(() => {
    const preventContextMenu = (e) => e.preventDefault();
    const preventDrag = (e) => e.preventDefault();

    containerRef.current?.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDrag);
    
    return () => {
      containerRef.current?.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDrag);
    };
  }, []);

  useGSAP(() => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div 
      id="about" 
      className="min-h-screen w-screen"
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Oulimey
        </p>
      
        <AnimatedTitle
          title="<b>W</b><b>e<b/>b, <b>M</b>obil<b>e<b/>, 3<b>D</b> &amp; Gr<b>a</b>phi<b>c</b>s<br /><b>A</b>ll in <b>o</b>n<b>e<b/> cre<b>a</b>tiv<b>e<b/> min<b>d</b>"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>A multidisciplinary developer and designer with a passion for web, mobile, 3D, and visual storytelling, I turn simple ideas into immersive digital experiences.</p>
        </div>
      </div>

      {/* Added positioning class to manage mobile layout */}
      <div className="h-dvh w-screen relative" id="clip">
        <div 
          className="mask-clip-path about-image absolute"
          onContextMenu={(e) => e.preventDefault()}
        >
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
            {...mediaProtectionProps}
            style={mediaProtectionStyles}
          />
        </div>
      </div>
      
      {/* Add CSS for proper mobile styling */}
      <style jsx>{`
        @media screen and (max-width: 767px) {
          #clip {
            position: relative;
            z-index: 1;
            margin-bottom: 40vh; /* Add margin below to prevent content overlap */
          }
          
          .mask-clip-path {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
          }
          
          .about-subtext {
            position: relative;
            z-index: 3; /* Ensure text stays above image */
          }
        }
      `}</style>
    </div>
  );
};

export default About;
