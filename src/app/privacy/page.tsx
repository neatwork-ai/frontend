"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/navBar';
import React, { useRef } from 'react';

const Careers = () => {
    const [isMobileView, setIsMobileView] = React.useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
    const navBarRef = useRef<HTMLElement | null>(null);
    const [contentMaxHeight, setContentMaxHeight] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
        const updateHeight = () => {
            if (navBarRef.current) {
                const navBarHeight = navBarRef.current.offsetHeight;
                const viewportHeight = window.innerHeight;
                
                // Set the content max height to be viewport minus the navbar height.
                // Adjust as needed for additional spacing or other elements.
                setContentMaxHeight((viewportHeight - navBarHeight) * 0.8);
            }
        }
    
        // Initial calculation
        updateHeight();
    
        // Add a resize listener
        window.addEventListener('resize', updateHeight);
    
        // Cleanup the listener on component unmount
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <>
            <Navbar isMobileView={isMobileView} setIsMobileView={setIsMobileView} ref={navBarRef} />
            <main
                className="pt-32 sub-content flex flex-col min-h-screen relative bg-gradient-dark-blue"
            >
                <div className="flex-1 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <h1 
                        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', color: '#FFFFFF', marginTop: '80px' }} 
                        className="text-4xl font-bold z-10 mb-4"
                    >
                        Privacy Policy
                    </h1>

                    <div 
                        className="scrollable-content overflow-auto px-4 sm:px-16 md:px-80 lg:px-80 xl:px-80 2xl:px-80"
                        style={{ maxHeight: `${contentMaxHeight}px` }}
                    >
                        <p 
                            style={{ fontFamily: 'Exo, sans-serif', color: '#FFFFFF', marginBottom: '20px' }} 
                            className="color"
                        >
                            Policy
                        </p>
                    </div>
                </motion.div>
                </div>
            </main>
        </>
    );
}

export default Careers;