import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const IntroExp = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Handle canvas setup for protected image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Match canvas dimensions to image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0);
      
      // Apply subtle protection layer that doesn't affect appearance
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = "rgba(0,0,0,0.0001)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    img.src = "img/balloons.webp";
    
    // Global right-click prevention
    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    
    // Add global right-click prevention
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventContextMenu);
    };
  }, []);

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#experience-clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".experience-mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
      
        <AnimatedTitle
          title="<b>T</b>en ye<b>a</b>rs of cre<b>a</b>ting digit<b>a</b>l exp<b>e</b>riences"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="experience-subtext">
          <p>From simple websites to complex applications, I've spent a decade crafting digital experiences that merge creativity with functionality.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="experience-clip" ref={containerRef}>
        <div className="experience-mask-clip-path experience-image">
          {/* Canvas replacement for img with identical styling and behavior */}
          <div className="absolute left-0 top-0 size-full">
            <canvas
              ref={canvasRef}
              className="absolute left-0 top-0 size-full object-cover"
              style={{
                objectPosition: 'center center',
                objectFit: 'cover',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
            
            {/* Invisible protective overlay that doesn't affect appearance */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                backgroundImage: 'radial-gradient(transparent 99.99%, rgba(0,0,0,0.0001) 0.01%)',
                backgroundSize: '2px 2px',
                opacity: 0.001,
                mixBlendMode: 'normal'
              }}
            />
          </div>
        </div>
      </div>

      <h1 className="special-font transition-heading absolute bottom-5 right-5 text-black">
        CR<b>A</b>FTING THE FUTU<b>R</b>E
      </h1>
    </div>
  );
};

export default IntroExp;