import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

const LandingSection = () => {
    const controls = useAnimation();
    const [scrollY, setScrollY] = useState(0);

    const rotationAnimation = {
        rotate: [0, 360]
    };
    
    const rotationTransition = {
        repeat: Infinity, 
        duration: 10, 
        ease: "linear"
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // Add the event listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Cleanup the event listener
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const maxScroll = 500;
    
        const scale = Math.max(1 - scrollY / maxScroll, 0); // Scale will reduce linearly with scroll
        const opacity = Math.max(1 - scrollY / maxScroll, 0); // Opacity will reduce linearly with scroll
    
        controls.start({
            scale: scale,
            opacity: opacity
        });
    
    }, [scrollY, controls]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between h-screen bg-dark-blue px-80">
            <div className="flex flex-col w-full md:w-auto text-center md:text-left mb-10 md:mb-0 justify-start">
                <h1 style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'pre-wrap' }} className="text-4xl font-bold">
                    <span style={{ color: '#DFEAFF' }}>Turn your IDE into an {'\n'}</span>
                    <span style={{ color: '#5B89FF' }}>AI </span>
                    <span style={{ color: '#DAEBE7' }}>Software Engineer</span>
                </h1>
            </div>
            <motion.div 
                className="relative w-full md:w-auto justify-end"
                animate={rotationAnimation}
                transition={rotationTransition}
            >
                <motion.div 
                    animate={controls}
                    className="relative w-full md:w-auto justify-end"
                >
                    <Image 
                        src="/assets/white_shadow.svg" 
                        alt="Company Logo" 
                        width={284}
                        height={281}
                        className="filter drop-shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)]"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LandingSection;
