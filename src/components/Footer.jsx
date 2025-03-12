import { FaInstagram ,FaFacebook, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.instagram.com/_oulimey_/", icon: <FaInstagram /> },
  { href: "https://www.facebook.com/oulimeyounes/", icon: <FaFacebook /> },
  { href: "https://wa.me/8619945162536", icon: <FaWhatsapp /> },
  { href: "mailto:contact@oulimey.net?subject=Hello&body=I%20would%20like%20to%20connect", icon: <FaEnvelope /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-black py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-white text-center text-sm font-light md:text-left">
          ©Oulimey 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
