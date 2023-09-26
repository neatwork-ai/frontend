"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/navBar';
import { motion, useAnimation } from 'framer-motion';
import AutoPlayVideo from './components/video';

export default function Home() {
    const [targetY, setTargetY] = useState(0);
    const controls = useAnimation();
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

        const updatePosition = () => {
            const difference = targetY - lastY.current;
            
            // Check if the difference is within a small threshold (e.g., 1) 
            if (Math.abs(difference) < 1) { 
                controls.set({ y: targetY });
                cancelAnimationFrame(rafRef.current!);
            } else {
                const newY = difference * 0.5 + lastY.current;
                controls.start({ y: newY });
                lastY.current = newY;
                rafRef.current = requestAnimationFrame(updatePosition);
            }
        };
        

        window.addEventListener("wheel", handleWheel);
        rafRef.current = requestAnimationFrame(updatePosition);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            cancelAnimationFrame(rafRef.current!);
        };
    }, [targetY, controls]);

    const calculateOpacity = () => {
        return Math.min(1, Math.abs(targetY / 250));  // adjust denominator as needed
    };

    const calculateScale = () => {
        return 0.5 + (0.5 * calculateOpacity());  // scale between 0.5 to 1 based on opacity
    };

    return (
        <>
            <Navbar />
            <main className="bg-dark-blue flex flex-col justify-center min-h-screen">
           <motion.div
    className="flex flex-col items-center justify-center h-screen bg-dark-blue px-80 relative" // Added relative positioning here
    animate={controls}
>
    <h1 
        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'pre-wrap' }} 
        className="text-4xl font-bold z-10" // Added z-index to ensure slogan stays on top
    >
        <span style={{ color: '#DFEAFF' }}>Turn your IDE into an {'\n'}</span>
        <span style={{ color: '#5B89FF' }}>AI </span>
        <span style={{ color: '#DAEBE7' }}>Software Engineer</span>
    </h1>
    <motion.div 
        className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center" // Set to absolute positioning
        style={{ 
            opacity: calculateOpacity(), 
            scale: calculateScale()
        }}
    >
        <AutoPlayVideo />
    </motion.div>
</motion.div>


            </main>
        </>
    );
}