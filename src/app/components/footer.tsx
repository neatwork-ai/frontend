import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      style={{ fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap' }} 
      className="w-full flex flex-col justify-between items-center p-8 text-white absolute bottom-0 left-0">
        
      {/* Top Section */}
      <div className="flex justify-between w-full items-center">
        {/* Left Section */}
        <div className="flex flex-col space-y-2">
          <h1>Neatwork.Ai</h1>
          <p>The future of work is Neat.</p>
          <a href="mailto:hello@neatwork.ai">hello@neatwork.ai</a>
          <div className="flex space-x-2 mt-2">
          <a href="https://twitter.com/neatwork_ai" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://linkedin.com/company/neatwork-ai" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
          </a>
          </div>
        </div>

        {/* Right Section */}
        <ul className="flex flex-col space-y-2">
          <li><Link href="/">neatcoder</Link></li>
          <li><Link href="/about">about us</Link></li>
          <li><Link href="/careers">careers</Link></li>
          <li><Link href="/privacy">privacy policy</Link></li>
        </ul>
      </div>
        
      {/* Center Section - Now in the middle vertically */}
      <div className="text-center mt-4">
        ©2023 Neatwork.Ai. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
