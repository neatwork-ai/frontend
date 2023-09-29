"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/navBar';
import { motion, useAnimation } from 'framer-motion';
import AutoPlayVideo from './components/video';

let maxAbsoluteShift: number;
let currentSloganPosition: number;

export default function Home() {
    const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);


    const [targetY, setTargetY] = useState(0);
    const sloganControls = useAnimation();
    const videoControls = useAnimation();
    const lastY = useRef(0);
    const rafRef = useRef<number | null>(null);

    // Assuming you have refs to both elements in a React component
    const parentRef = useRef<HTMLDivElement | null>(null);
    const navBarRef = useRef<HTMLElement | null>(null);
    const sloganRef = useRef<HTMLParagraphElement | null>(null);

    // This should run if the screen is resized, not when scrolling occurs
    const setMaxShift = (override: Boolean) => {
        if (sloganRef.current && navBarRef.current) {
            if (!maxAbsoluteShift || override) {
                const sloganBounds = sloganRef.current.getBoundingClientRect();
                const navBarBounds = navBarRef.current.getBoundingClientRect();

                console.log(`maxAbsoluteShift =  - (sloganBounds.top - navBarBounds.bottom) => - (${sloganBounds.top} - ${navBarBounds.bottom}) = ${- (sloganBounds.top - navBarBounds.bottom)}`)
    
                // BUG: When the slogan is scrolled UP this will return a too high amount: sloganBounds.top-- whenever we resize the window...
                // SOLUTION: STORE lastY.current as a global variable so we can perform the adjustment...

                // Example: -(163 - 104) => -59
                // represents the height between the slogan and the navbar in negative terms
                if (currentSloganPosition != undefined) {
                    maxAbsoluteShift =  - (sloganBounds.top - currentSloganPosition - navBarBounds.bottom);
                } else {
                    maxAbsoluteShift =  - (sloganBounds.top - navBarBounds.bottom);
                }
            }
            return maxAbsoluteShift;
        }
    }

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Do not recalculate this
            let MAX_SHIFT = setMaxShift(false)!;
            MAX_SHIFT = MAX_SHIFT;// - lastY.current;

            console.log("lastY.current:", lastY.current);
            console.log("MAX_SHIFT:", MAX_SHIFT);
            let newTarget = lastY.current - e.deltaY * 1.2;
            console.log("proposed shift:", newTarget);
            
            newTarget = Math.max(MAX_SHIFT, newTarget);
            newTarget = Math.min(0, newTarget);
            console.log("new targ:", newTarget);

            setTargetY(newTarget);
            currentSloganPosition = newTarget;
            lastY.current = newTarget;
        };

        const handleResize = () => {
            setMaxShift(true);
        };

        window.addEventListener("resize", handleResize); 
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
            <div ref={parentRef}>
            <Navbar ref={navBarRef} />
            <main className="main-content bg-gradient-dark-blue flex flex-col justify-center min-h-screen relative">
                {/* Slogan */}
                <motion.div
                    ref={sloganRef}
                    className="flex flex-col items-center justify-center h-auto md:px-80"
                    animate={sloganControls}
                >
                    <h1 
                        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap' }} 
                        className="text-4xl font-bold z-10"
                    >
                        <span style={{ color: '#567CCA' }}>Turn your IDE into an</span><br />
                        <span><span style={{ color: '#217AFF' }}>Ai</span> <span style={{ color: '#DAEBE7' }}>software engineer</span></span>
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
            </div>
        </>
    );
}
