import React, { useEffect, useState, forwardRef } from 'react';
import GlassButton from './download';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from 'framer-motion';


const Navbar = forwardRef<HTMLElement, {}>((props, ref) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Assuming 768px as the breakpoint for mobile view

  const controls = useAnimation();

  useEffect(() => {
    // Start the rotation
    controls.start({
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 10,
        ease: "linear"
      }
    });

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
        setIsMenuOpen(false); // Close mobile menu when not in mobile view
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [controls]);

  return (
    <nav ref={ref} className="fixed top-0 w-full z-50 flex justify-between md:flex-row items-center p-8 md:px-80">
      <div className="flex items-center">
        <motion.div className="relative w-10 h-10" animate={controls}>
          <Image 
             src="/assets/light-logo.svg" 
             alt="Company Logo" 
             layout="fill"
             objectFit="contain"
          />
        </motion.div>
        <span className="logo-font ml-2">Neatwork.Ai</span>
      </div>
      {isMobileView ? (
        <div className="flex items-center">
          <FontAwesomeIcon 
            icon={faBars} 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="cursor-pointer"
            color="white" // Set color to white
            size="2x"     // Adjust size. Change the value if you need it bigger or smaller.
          />
          {isMenuOpen && (
    <div 
        className="fixed top-0 left-0 w-full h-full bg-black z-10" 
        // This covers the entire viewport with a dark transparent background
    > 
        <FontAwesomeIcon 
            icon={faTimes} 
            className="cursor-pointer text-white absolute top-4 right-4 text-2xl" 
            // This positions the cross icon on the top right of the viewport and makes it white and larger
            onClick={() => setIsMenuOpen(false)} 
            // This closes the menu when the cross icon is clicked
        />

        <ul className="flex flex-col items-center justify-center h-full space-y-4">
            <li>
                <a 
                    href="#neatcoder" 
                    className={`navbar-button text-xl ${activeLink === 'neatcoder' ? 'active' : ''}`}
                    onClick={() => {
                        setActiveLink('neatcoder');
                        setIsMenuOpen(false);
                    }}
                >
                  neatcoder
                </a>
            </li>
            <li>
                <a 
                    href="#openbook" 
                    className={`navbar-button text-xl ${activeLink === 'openbook' ? 'active' : ''}`}
                    onClick={() => {
                        setActiveLink('openbook');
                        setIsMenuOpen(false);
                    }}
                >
                  openbook
                </a>
            </li>
            <li>
                <a 
                    href="#contribute" 
                    className={`navbar-button text-xl ${activeLink === 'contribute' ? 'active' : ''}`}
                    onClick={() => {
                        setActiveLink('contribute');
                        setIsMenuOpen(false);
                    }}
                >
                  contribute
                </a>
            </li>
        </ul>
    </div>
)}

        </div>
      ) : (
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <a 
          href="#neatcoder" 
          className={`navbar-button ${activeLink === 'neatcoder' ? 'active' : ''}`}
          onClick={() => setActiveLink('neatcoder')}
        >
          neatcoder
        </a>
        <a 
          href="#openbook" 
          className={`navbar-button ${activeLink === 'openbook' ? 'active' : ''}`}
          onClick={() => setActiveLink('openbook')}
        >
          openbook
        </a>
        <a 
          href="#contribute" 
          className={`navbar-button ${activeLink === 'contribute' ? 'active' : ''}`}
          onClick={() => setActiveLink('contribute')}
        >
          contribute
        </a>
        <GlassButton />
      </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
