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
      
        <AnimatedTitle
          title="<b>W</b><b>e<b/>b, <b>M</b>obil<b>e<b/>, 3<b>D</b> &amp; Gr<b>a</b>phi<b>c</b>s<br /><b>A</b>ll in <b>o</b>n<b>e<b/> cre<b>a</b>tiv<b>e<b/> min<b>d</b>"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p> As a multidisciplinary developer and designer passionate about web, mobile, 3D, and visual storytelling, I turn simple ideas into immersive digital experiences.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div 
          className="mask-clip-path about-image"
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
    </div>
  );
};

export default About;
