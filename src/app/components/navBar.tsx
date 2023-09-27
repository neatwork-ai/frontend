import React, { useEffect } from 'react';
import GlassButton from './download';
import Image from 'next/image';

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

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
  }, [controls]);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-8 md:px-80">
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
      <div className="flex items-center space-x-4">
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
    </nav>
  );
};


export default Navbar;
