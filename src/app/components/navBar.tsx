"use client";

import React, { useEffect, useState, forwardRef } from 'react';
import { Router } from 'next/router';
import GlassButton from './download';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from 'framer-motion';
import { trackEvent } from '@/mixpanel/mixpanel';

interface NavbarProps {
  isMobileView: boolean;
  setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
  const [pathname, setPathname] = useState('');

  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isMobileView, setIsMobileView} = props; // Assuming 768px as the breakpoint for mobile view

  const controls = useAnimation();

  useEffect(() => {
    // Record which route we're in
    setPathname(window.location.pathname);

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
      if (window.innerWidth <= 866) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
        setIsMenuOpen(false); // Close mobile menu when not in mobile view
      }
    };

    window.addEventListener('resize', handleResize);

    const handleRouteChange = (url: string) => {
      setPathname(url);
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [controls, setIsMobileView]);

  return (
    <nav ref={ref} className="fixed top-0 w-full z-50 flex justify-between md:flex-row items-center p-8 md:px-40">
      <Link
        href="/"
        onClick={() => trackEvent('Button clicked: logo', { page: 'neatcoder', location: 'navbar' })}
      >
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
      </Link>
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
                <Link 
                      href="/" 
                      className={`navbar-button ${pathname === '/' ? 'active' : ''}`}
                      onClick={() => {
                          setActiveLink('neatcoder');
                          trackEvent('Button clicked: neatcoder', { page: 'neatcoder', location: 'mobile-menu' });
                      }}
                  >
                    neatcoder
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  onClick={() => {
                    setActiveLink('about');
                    trackEvent('Button clicked: about', { page: 'about', location: 'mobile-menu' });
                  }}
                  className={`navbar-button ${pathname === '/about' ? 'active' : ''}`}
                >
                  about us
                </Link>
              </li>
              <li>
              <Link 
                href="/careers"
                onClick={() => {
                  setActiveLink('careers');
                  trackEvent('Button clicked: carreers', { page: 'about', location: 'mobile-menu' });
                }}
                className={`navbar-button ${pathname === '/careers' ? 'active' : ''}`}
              >
                careers
              </Link>
              </li>
              <li>
              <Link 
                href="https://marketplace.visualstudio.com/vscode"
                onClick={() => {
                  trackEvent('Button clicked: download', { location: 'mobile-menu' });
                }}
                className={`navbar-button`}
              >
                download
              </Link>
              </li>
          </ul>
        </div>
    )}
        </div>
      ) : (
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <Link 
          href="/" 
          onClick={() => {
            setActiveLink('neatcoder');
            trackEvent('Button clicked: neatcoder', { page: 'neatcoder' });
          }}
          className={`navbar-button ${pathname === '/' ? 'active' : ''}`}
        >
          neatcoder
        </Link>
        <Link 
          href="/about"
          onClick={() => {
            setActiveLink('about');
            trackEvent('Button clicked: about', { page: 'about' });
          }}
          className={`navbar-button ${pathname === '/about' ? 'active' : ''}`}
        >
          about us
        </Link>
        <Link 
            href="/careers"
            onClick={() => {
              setActiveLink('careers');
              trackEvent('Button clicked: careers', { page: 'careers' });
            }}
            className={`navbar-button ${pathname === '/careers' ? 'active' : ''}`}
          >
            careers
        </Link>
        <GlassButton />
      </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
