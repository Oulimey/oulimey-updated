import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const clipRef = useRef(null);
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Set up resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  // GSAP animations
  useGSAP(() => {
    // Clear any existing ScrollTrigger instances to prevent duplicates
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Different animation settings for mobile vs desktop
    if (isMobile) {
      // Mobile animation - ensures text stays visible
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      // Set initial position for mobile
      gsap.set(".mask-clip-path", {
        width: "90vw",
        height: "50vh", // Smaller initial height on mobile to avoid covering text
        borderRadius: "20px",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
      });

      clipAnimation.to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        top: "50%", 
        left: "50%",
        x: "-50%",
        y: "-50%",
      });
    } else {
      // Desktop animation - original behavior
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
    }
  }, [isMobile]); // Re-run when mobile state changes

  return (
    <div 
      id="about" 
      className="min-h-screen w-screen"
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
      
        <AnimatedTitle
          title="<b>W</b><b>e<b/>b, <b>M</b>obil<b>e<b/>, 3<b>D</b> &amp; Gr<b>a</b>phi<b>c</b>s<br /><b>A</b>ll in <b>o</b>n<b>e<b/> cre<b>a</b>tiv<b>e<b/> min<b>d</b>"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>A multidisciplinary developer and designer with a passion for web, mobile, 3D, and visual storytelling, I turn simple ideas into immersive digital experiences.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip" ref={clipRef}>
        <div 
          className="mask-clip-path about-image"
          onContextMenu={(e) => e.preventDefault()}
          ref={imageRef}
        >
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
            {...mediaProtectionProps}
            style={{
              ...mediaProtectionStyles,
              transform: "translateZ(0)", // Force GPU acceleration
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .mask-clip-path {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          will-change: transform, width, height, border-radius;
        }
        
        .about-image {
          width: ${isMobile ? "90vw" : "70vw"};
          height: ${isMobile ? "50vh" : "70vh"};
          border-radius: 20px;
        }
        
        .about-subtext {
          max-width: 600px;
          text-align: center;
          padding: 0 20px;
          margin-bottom: ${isMobile ? "40px" : "20px"};
        }
        
        @media (max-width: 768px) {
          .about-image img {
            object-position: center;
          }
        }
      `}</style>
    </div>
  );
};

export default About;