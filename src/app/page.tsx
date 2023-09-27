"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/navBar';
import { motion, useAnimation } from 'framer-motion';
import AutoPlayVideo from './components/video';

export default function Home() {
    const [targetY, setTargetY] = useState(0);
    const sloganControls = useAnimation();
    const videoControls = useAnimation();
    const lastY = useRef(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const MAX_Y = -250;
            let newTarget = lastY.current - e.deltaY * 1.2;

            newTarget = Math.max(MAX_Y, newTarget);
            newTarget = Math.min(0, newTarget);

            setTargetY(newTarget);
            lastY.current = newTarget;
        };

        window.addEventListener("wheel", handleWheel);

        // Animation for the slogan
        sloganControls.start({ y: targetY });

        // Animation for the video
        const opacity = Math.min(1, Math.abs(targetY / 250));
        const scale = 0.5 + (0.5 * opacity);
        videoControls.start({ opacity, scale });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [targetY, sloganControls, videoControls]);

    return (
        <>
            <Navbar />
            <main className="bg-dark-blue flex flex-col justify-center min-h-screen relative">
                {/* Slogan */}
                <motion.div
                    className="flex flex-col items-center justify-center h-auto bg-dark-blue md:px-80"
                    animate={sloganControls}
                >
                    <h1 
                        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap' }} 
                        className="text-4xl font-bold z-10"
                    >
                        <span style={{ color: '#DFEAFF' }}>Turn your IDE into an</span><br />
                        <span><span style={{ color: '#5B89FF' }}>AI</span> <span style={{ color: '#DAEBE7' }}>software engineer</span></span>
                    </h1>
                </motion.div>

                {/* Video */}
                <motion.div 
                    className="absolute top-1/2 left-0 w-full flex items-center justify-center mt-[-10%]"
                    initial={{ opacity: 0, scale: 0.5 }} // setting initial values
                    animate={videoControls}
                >
                    <AutoPlayVideo />
                </motion.div>
            </main>
        </>
    );
}
