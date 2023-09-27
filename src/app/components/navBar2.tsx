// import React, { useEffect, useState } from 'react';
// import GlassButton from './download';
// import Image from 'next/image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { motion, useAnimation } from 'framer-motion';

// const Navbar = () => {
//   const [activeLink, setActiveLink] = useState<string | null>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Assuming 768px as the breakpoint for mobile view

//   const controls = useAnimation();

//   useEffect(() => {
//     // Start the rotation
//     controls.start({
//       rotate: [0, 360],
//       transition: {
//         repeat: Infinity,
//         duration: 10,
//         ease: "linear"
//       }
//     });

//     const handleResize = () => {
//       if (window.innerWidth <= 768) {
//         setIsMobileView(true);
//       } else {
//         setIsMobileView(false);
//         setIsMenuOpen(false); // Close mobile menu when not in mobile view
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [controls]);

//   return (
//     <nav className="fixed top-0 w-full z-50 flex justify-between flex-col md:flex-row items-center p-8 md:px-80 bg-green-800">
//       <div className="flex items-center flex-shrink-0 bg-red-800">
//         <motion.div className="relative w-10 h-10" animate={controls}>
//           <Image 
//              src="/assets/light-logo.svg" 
//              alt="Company Logo" 
//              layout="fill"
//              objectFit="contain"
//           />
//         </motion.div>
//         <span className="logo-font ml-2">Neatwork.Ai</span>
//       </div>
//       {isMobileView ? (
//         <div className="flex items-center">
//           <FontAwesomeIcon 
//             icon={faBars} 
//             onClick={() => setIsMenuOpen(!isMenuOpen)} 
//             className="cursor-pointer"
//           />
//           {isMenuOpen && (
//             <div className="absolute top-full right-0 bg-white shadow-md rounded">
//               {/* The menu items for mobile view. Adjust the styles accordingly. */}
//               {/* ... Repeat the menu items (neatcoder, openbook, etc.) ... */}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex items-center space-x-4 mt-4 md:mt-0 bg-blue-800">
//           <div className="flex items-center space-x-4 mt-4 md:mt-0 bg-blue-800">
//         <a 
//           href="#neatcoder" 
//           className={`navbar-button ${activeLink === 'neatcoder' ? 'active' : ''}`}
//           onClick={() => setActiveLink('neatcoder')}
//         >
//           neatcoder
//         </a>
//         <a 
//           href="#openbook" 
//           className={`navbar-button ${activeLink === 'openbook' ? 'active' : ''}`}
//           onClick={() => setActiveLink('openbook')}
//         >
//           openbook
//         </a>
//         <a 
//           href="#contribute" 
//           className={`navbar-button ${activeLink === 'contribute' ? 'active' : ''}`}
//           onClick={() => setActiveLink('contribute')}
//         >
//           contribute
//         </a>
//         <GlassButton />
//       </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
