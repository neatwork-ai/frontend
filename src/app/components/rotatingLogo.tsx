import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

const RotatingLogo = () => {
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
        // For demonstration purposes, I'm setting the maximum scroll value at which the logo vanishes to 500.
        // You can adjust this value based on your requirements.
        const maxScroll = 500;
    
        const scale = Math.max(1 - scrollY / maxScroll, 0); // Scale will reduce linearly with scroll
        const opacity = Math.max(1 - scrollY / maxScroll, 0); // Opacity will reduce linearly with scroll
    
        controls.start({
            scale: scale,
            opacity: opacity
        });
    
    }, [scrollY, controls]);

    return (
        <div className="relative w-full md:w-auto justify-end" id="logo">
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

export default RotatingLogo;
