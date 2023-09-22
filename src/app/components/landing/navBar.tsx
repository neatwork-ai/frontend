import React from 'react';
import GlassButton from './download';
import Image from 'next/image';

import { useState } from 'react';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-8 px-80 bg-dark-blue">
      <div className="flex items-center">
        <Image 
          src="/assets/white_transparent.svg" 
          alt="Company Logo" 
          width={180}  // specify a width
          height={42}  // and a height
          className="mr-2" 
        />
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
