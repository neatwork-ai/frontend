"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/navBar';
import { motion, useAnimation } from 'framer-motion';
import AutoPlayVideo from './components/video';

let maxAbsoluteShift: number;
let currentSloganPosition: number;
let lastEventTime: number;

export default function Home() {
    const [scrollPhase, setScrollPhase] = useState(0);

    const [targetY, setTargetY] = useState(0);
    const sloganControls = useAnimation();
    const videoControls = useAnimation();
    const lastY = useRef(0);
    // const scrollPhaseRef = useRef(scrollPhase);

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

                // console.log(`maxAbsoluteShift =  - (sloganBounds.top - navBarBounds.bottom) => - (${sloganBounds.top} - ${navBarBounds.bottom}) = ${- (sloganBounds.top - navBarBounds.bottom)}`)

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
            // The first step is to understand in which phase we are in
            // as well as the direction of the wheel

            // To determine the direction of the wheel scroll, we examine the
            // deltaY property of the WheelEvent object in the event handler:
            let isForward = e.deltaY > 0 // is true if wheel was scrolled downwards and false if upwards

            console.log("Scroll Phase: " + scrollPhase);

            switch (scrollPhase) {
                case 0: {
                    // == Action Handling ==
                    let MAX_SHIFT = setMaxShift(false)!; // False signals that we do not recalculate this

                    let newTarget = lastY.current - e.deltaY * 1.2; // 1.2 is the sensitivity
        
                    newTarget = Math.max(MAX_SHIFT, newTarget); // To prevent overflowing
                    newTarget = Math.min(0, newTarget); // To prevent underflowing

                    setTargetY(newTarget);
                    currentSloganPosition = newTarget;
                    lastY.current = newTarget;

                    console.log("isForward:" + isForward);

                    // == State Transition == 

                    if (isForward) {
                        // In order to move to the next phase we need to hit
                        // two criteria:
                        // - We need to identity that this is a new discrete scrolling action
                        // - The position of the Slogan component must be it's final upper position

                        const currentTime = Date.now();
                        if (currentTime - lastEventTime > 1000 && lastY.current == MAX_SHIFT) {
                            console.log("Entering Phase 1!");
                            setScrollPhase(1);
                        }
                        lastEventTime = currentTime;
                    } // We are already in the first phase so we can't transition backwards anymore

                    break;
                }
                case 1: {
                    const currentTime = Date.now();
                    if (currentTime - lastEventTime > 1000) {
                        if (isForward) {
                            console.log("Entering Phase 2!");
                            setScrollPhase(2);
                        } else {
                            console.log("Back to Phase 0!");
                            setScrollPhase(0);
                        }
                    }
                    lastEventTime = currentTime;
                    
                    break;
                }
                case 2: {
                    const currentTime = Date.now();
                    if (currentTime - lastEventTime > 1000) {
                        if (isForward) {
                            console.log("Entering Phase 3!");
                            setScrollPhase(3);
                        } else {
                            console.log("Back to Phase 1!");
                            setScrollPhase(1);
                        }
                    }
                    lastEventTime = currentTime;
                    
                    break;
                }
                case 3: {
                    const currentTime = Date.now();
                    if (currentTime - lastEventTime > 1000) {
                        if (isForward) {
                            console.log("Reached the last phase...");
                        } else {
                            console.log("Back to Phase 2!");
                            setScrollPhase(2);
                        }
                    }
                    lastEventTime = currentTime;

                    break;
                }
            }
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
    }, [targetY, sloganControls, videoControls, scrollPhase]);

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
