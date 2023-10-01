"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/navBar';
import { motion, useAnimation } from 'framer-motion';
import AutoPlayVideo from './components/video';
import PaginationIndicator from './components/pagination';
import TypingComponent from './components/test';
import Typist from 'react-typist-component';

let maxAbsoluteShift: number;
let currentSloganPosition: number;
let transitionCounter = 0;
let deltaTMinusOne = 0;

export default function Home() {
    const [scrollPhase, setScrollPhase] = useState(0);

    const handleDotClick = (index: number) => {
        setScrollPhase(index);
        transitionCounter = 0;
        deltaTMinusOne = 0;
    };

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

            console.log("DELTA: "+ e.deltaY);

            // To determine the direction of the wheel scroll, we examine the
            // deltaY property of the WheelEvent object in the event handler:
            let isForward = e.deltaY > 0 // is true if wheel was scrolled downwards and false if upwards

            // console.log("Scroll Phase: " + scrollPhase);

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

                    // == State Transition == 

                    if (isForward) {
                        // In order to move to the next phase we need to hit
                        // two criteria:
                        // - Have reached the MAX Y state
                        // - Have 6 increasing deltas in a row, representing a new wheel action
                        
                        // Transition counter registers everytime the delta increases
                        if (lastY.current == MAX_SHIFT && e.deltaY > deltaTMinusOne) {
                            console.log("Max reached!");
                            transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (transitionCounter >= 6) {
                            console.log("Entering Phase 1!");
                            setScrollPhase(1);

                            // Reset transition counter
                            transitionCounter = 0;
                        }
                    } // We are already in the first phase so we can't transition backwards anymore

                    break;
                }
                case 1: {
                    if (isForward) {
                        // In order to move to the next phase we need to hit
                        // two criteria:
                        // - Have 6 increasing deltas in a row, representing a new wheel action
                    
                        // Transition counter registers everytime the delta increases
                        if (e.deltaY > deltaTMinusOne) {
                            console.log("Max reached!");
                            transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (transitionCounter >= 5) {
                            console.log("Entering Phase 2!");
                            setScrollPhase(2);

                            // Reset transition counter
                            transitionCounter = 0;
                        }
                    } else {
                        if (-e.deltaY > -deltaTMinusOne) {
                            console.log("Max reached!");
                            transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (transitionCounter >= 6) {
                            console.log("Backtracing to Phase 0!");
                            setScrollPhase(0);

                            // Reset transition counter
                            transitionCounter = 0;
                        }
                    }
                    
                    break;
                }
                case 2: {
                    if (isForward) {
                        // In order to move to the next phase we need to hit
                        // two criteria:
                        // - Have 6 increasing deltas in a row, representing a new wheel action
                    
                        // Transition counter registers everytime the delta increases
                        if (e.deltaY > deltaTMinusOne) {
                            console.log("Max reached!");
                            transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (transitionCounter >= 5) {
                            console.log("Entering Phase 3!");
                            setScrollPhase(3);
                            // Reset transition counter
                            transitionCounter = 0;
                        }
                    } else {
                        if (-e.deltaY > -deltaTMinusOne) {
                            console.log("Max reached!");
                            transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (transitionCounter >= 5) {
                            console.log("Backtracing to Phase 1!");
                            setScrollPhase(1);

                            // Reset transition counter
                            transitionCounter = 0;
                        }
                    }
             
                    
                    break;
                }
                case 3: {
                    if (isForward) {
                        console.log("Reached the last phase...");
                    } else {
                        if (-e.deltaY > -deltaTMinusOne) {
                            console.log("Max reached!");
                            transitionCounter += 1;
                        }

                        // Whenever we hit 3 increasing deltas it means we are ready to move to the next
                        // scrolling phase
                        if (transitionCounter >= 5) {
                            console.log("Backtracing to Phase 2!");
                            setScrollPhase(2);

                            // Reset transition counter
                            transitionCounter = 0;
                        }
                    }

                    break;
                }
            }

            deltaTMinusOne = e.deltaY;
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
            <TypingComponent />
            {/* <Typist>
  Hello, I am a typing animation! <Typist.Backspace count={5} delay={500} />
</Typist> */}

            <main className="main-content bg-gradient-dark-blue flex flex-col items-center justify-center min-h-screen relative">
            <PaginationIndicator totalSlides={4} currentSlide={scrollPhase} onDotClick={handleDotClick} />
                {/* Slogan */}
                {scrollPhase === 0 && (
                    <motion.div
                    ref={sloganRef}
                    className="flex flex-col items-center justify-center h-auto md:px-80"
                    animate={sloganControls}
                >
                    <Typist
                        cursor={<span className="typing-cursor">|</span>}
                        typingDelay={50} // Adjust this for typing speed
                        backspaceDelay={50} // Adjust this for backspace speed
                        >
                        <h1 
                            style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', textAlign: 'center' }} 
                            className="text-4xl font-bold z-10"
                        >
                            <span style={{ color: '#567CCA' }}>Turn your IDE into an</span><br />
                            <span><span style={{ color: '#217AFF' }}>Ai</span> <span style={{ color: '#DAEBE7' }}>software engineer</span></span>
                        </h1>
                    </Typist>
                    
                </motion.div>
                )}

                {(scrollPhase === 1 || scrollPhase === 2) && (
                    <motion.div
                    ref={sloganRef}
                    className="flex flex-col items-center justify-center h-auto md:px-80"
                    initial={{ y: lastY.current }}
                    animate={{ y: lastY.current }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                      }}
                >
                    <h1 
                        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', textAlign: 'center' }} 
                        className="text-4xl font-bold z-10"
                    >
                        <span style={{ color: '#567CCA' }}>Dynamically Scaffold</span><br />
                        <span><span style={{ color: '#217AFF' }}>entire</span> <span style={{ color: '#DAEBE7' }}>Codebases</span></span>
                    </h1>
                </motion.div>
                )}

                {scrollPhase === 3 && (
                    <motion.div
                    ref={sloganRef}
                    className="flex flex-col items-center justify-center h-auto md:px-80"
                    initial={{ y: lastY.current }}
                    animate={{ y: lastY.current }}
                >
                    <h1 
                        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', textAlign: 'center' }} 
                        className="text-4xl font-bold z-10"
                    >
                        <span style={{ color: '#567CCA' }}>Stream code</span><br />
                        <span><span style={{ color: '#217AFF' }}>in</span> <span style={{ color: '#DAEBE7' }}>background</span></span>
                    </h1>
                </motion.div>
                )}

                {/* Video */}
                {(scrollPhase === 0 || scrollPhase === 1 || scrollPhase === 2) && (
                    <motion.div 
                    className="absolute top-1/2 left-0 w-full flex items-center justify-center mt-[-10%]"
                    initial={{ opacity: 0, scale: 0.5 }} // setting initial values
                    animate={videoControls}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    <AutoPlayVideo />
                </motion.div>
                )}
                {scrollPhase === 3 && (
                    <motion.div 
                    className="absolute top-1/2 left-0 w-full flex items-center justify-center mt-[-10%]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    <AutoPlayVideo filename="/demos/background_streaming.mp4" />
                </motion.div>
                )}

            </main>
            </div>
        </>
    );
}
