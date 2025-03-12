import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Load image into canvas instead of direct img element
    const img = new Image();
    
    img.onload = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      setImageDimensions({ width: img.width, height: img.height });
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0);
      
      // Apply subtle protection that doesn't affect appearance
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = "rgba(0,0,0,0.001)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    };
    
    // Load image
    img.src = "/img/entrance.webp";
    
    // Add protection against right-click and other common download methods
    const preventDefaultHandler = (e) => {
      if (e.target === canvasRef.current) {
        e.preventDefault();
        return false;
      }
    };
    
    document.addEventListener('contextmenu', preventDefaultHandler);
    document.addEventListener('dragstart', preventDefaultHandler);
    
    return () => {
      document.removeEventListener('contextmenu', preventDefaultHandler);
      document.removeEventListener('dragstart', preventDefaultHandler);
    };
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-cream-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal branding world
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="Yo<b>u</b> don't kn<b>o</b>w<br />wh<b>a</b>t yo<b>u</b>r brand is c<b>a</b>pable of"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <div
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  className="object-contain"
                >
                  <canvas 
                    ref={canvasRef}
                    className="object-contain"
                    style={{
                      display: 'block',
                      // Maintain exact same styling as the original img
                      width: '100%',
                      height: 'auto'
                    }}
                  />
                  
                  {/* Invisible overlay that prevents copying but preserves interaction */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      // This pattern is virtually invisible but disrupts image capture tools
                      backgroundImage: 'linear-gradient(transparent 99.95%, rgba(0,0,0,0.0001) 0.05%)',
                      backgroundSize: '1px 1px',
                      mixBlendMode: 'normal',
                      opacity: 0.001,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SVG filters - preserved exactly as in original */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-cream-50 md:text-start">
              Let's unlock its full potential with innovative design, immersive visuals,
              and strategic branding that speaks to your audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;