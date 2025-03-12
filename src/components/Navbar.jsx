import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const navItems = ["About", "Skills", "Experience", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const videoRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    controlsList: "nodownload nofullscreen noremoteplayback",
    disablePictureInPicture: true,
    disableRemotePlayback: true,
  };

  // Prevent context menu and drag events
  useEffect(() => {
    const preventContextMenu = (e) => e.preventDefault();
    const preventDrag = (e) => e.preventDefault();

    navContainerRef.current?.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDrag);
    
    return () => {
      navContainerRef.current?.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDrag);
    };
  }, []);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 md:top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      onContextMenu={(e) => e.preventDefault()}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <video
              ref={videoRef}
              className="h-16 w-auto object-contain"
              autoPlay
              muted
              playsInline
              loop
              {...mediaProtectionProps}
              style={mediaProtectionStyles}
            >
              <source src="videos/vidlogo.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn mr-6"
                >
                  {item}
                </a>
              ))}
            </div>

            {isMobileMenuOpen && (
              <div className="absolute top-16 right-0 bg-black bg-opacity-90 p-4 md:hidden">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="block py-2 text-white hover:text-gray-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}

            <div className="flex items-center">
              <button
                onClick={toggleAudioIndicator}
                className="flex items-center space-x-0.5 ml-6"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                  {...mediaProtectionProps}
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>
              
              <button
                onClick={toggleMobileMenu}
                className="ml-4 md:hidden"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col justify-between h-6 w-6">
                  <span className={`h-0.5 w-6 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`h-0.5 w-6 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;