"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/navBar';
import { motion, useAnimation } from 'framer-motion';
import { AutoPlayVideo } from './components/video';
import PaginationIndicator from './components/pagination';
import Typist from '@/typist/Typist';
import Footer from './components/footer';
import useWheelScroll from './hooks/wheel';
import { setMaxShift } from './utils';
import useTouchMove from './hooks/touch';
import { globals } from './globals';
import { GoogleAnalytics } from 'nextjs-google-analytics';

const footerVariants = {
    hidden: { y: '100%' },  // Start position (100% below the original position)
    visible: { y: '0%', transition: { duration: 0.2, ease: 'easeOut' } } // End position (original position)
  };

export default function Home() {
    const [scrollPhase, setScrollPhase] = useState(0);
    const [isMobileView, setIsMobileView] = useState(
        typeof window !== "undefined" ? window.innerWidth <= 768 : false
    );

    const handleDotClick = (index: number) => {
        setScrollPhase(index);
        globals.transitionCounter = 0;
        globals.deltaTMinusOne = 0;
    };

    const [targetY, setTargetY] = useState(0);
    const sloganControls = useAnimation();
    const videoControls = useAnimation();
    const lastY = useRef(0);

    // Assuming you have refs to both elements in a React component
    const parentRef = useRef<HTMLDivElement | null>(null);
    const navBarRef = useRef<HTMLElement | null>(null);
    const sloganRef = useRef<HTMLParagraphElement | null>(null);

    // Touchscreen refs
    const touchStartRef = useRef<number>(0);
    const touchEndRef = useRef<number>(0);

    const handleWheel = useWheelScroll(
        scrollPhase,
        setScrollPhase,
        setTargetY,
        lastY,
        navBarRef,
        sloganRef,
    );

    const handleTouchMove = useTouchMove(
        touchStartRef,
        touchEndRef,
        scrollPhase,
        setScrollPhase,
        setTargetY,
        lastY,
        navBarRef,
        sloganRef,
    );

    useEffect(() => {
        const handleResize = () => {
            setMaxShift(navBarRef, sloganRef, true);

            // TODO: Ideally we would adjust the Y position of the slogan as we resize
            // if (Math.abs(lastY.current) > Math.abs(globals.maxAbsoluteShift!)) {
            //     const newTarget = globals.maxAbsoluteShift!;
            //     setTargetY(newTarget);
            //     globals.currentSloganPosition = newTarget;
            // }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartRef.current = e.touches[0].clientY;
        };
        
        const handleTouchEnd = (e: TouchEvent) => {
            // Consider changing scrollState here if needed instead of the Move handler
            // let a = e.changedTouches[0].clientY;
            // console.log(a);
        };

        // Attach callbacks to event listeners
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener("resize", handleResize);
        window.addEventListener("wheel", handleWheel);

        // Animation for the slogan
        sloganControls.start({ y: targetY });

        // Animation for the video
        const opacity = Math.min(1, Math.abs(targetY / 25));
        const scale_ = Math.min(1, Math.abs(targetY / 250));
        const scale = 0.5 + (0.5 * scale_);
        videoControls.start({ opacity, scale });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("resize", handleResize);
        };
    }, [targetY, sloganControls, videoControls, scrollPhase, handleWheel, handleTouchMove]);

    return (
        <>
            <GoogleAnalytics trackPageViews gaMeasurementId="G-Q1QRP44VV1" />
            <div ref={parentRef}>
            <Navbar isMobileView={isMobileView} setIsMobileView={setIsMobileView} ref={navBarRef} />
            <main 
                className="main-content bg-gradient-dark-blue flex flex-col items-center justify-center min-h-screen relative"
            >
                {/* Slogan */}
                {scrollPhase === 0 && (
                    <motion.div
                    ref={sloganRef}
                    className="flex flex-col items-center justify-center h-auto md:px-80"
                    animate={sloganControls}
                >
                    <Typist
                        cursor={<span className="typing-cursor">|</span>}
                        typingDelay={45} // Adjust this for typing speed
                        >
                        <h1 
                            style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'normal', textAlign: 'center' }} 
                            className="text-4xl font-bold z-10"
                        >
                            <span style={{ color: '#567CCA' }}>Turn your IDE into an</span><br />
                            <span><span style={{ color: '#217AFF' }}>Ai</span> <span style={{ color: '#DAEBE7' }}>software engineer</span></span>
                        </h1>
                    </Typist>
                </motion.div>
                )}

                {scrollPhase === 1 && (
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
                        <Typist
                            cursor={<span className="typing-cursor">|</span>}
                            typingDelay={45} // Adjust this for typing speed
                            backspaceDelay={25} // Adjust this for backspace speed
                            loop={true} // This will make the sequence loop indefinitely
                        >
                            <Typist.Paste>
                                <h1 
                                    style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'normal', textAlign: 'center' }} 
                                    className="text-4xl font-bold z-10"
                                >
                                    <span style={{ color: '#567CCA' }}>Turn your IDE into an</span><br />
                                    <span><span style={{ color: '#217AFF' }}>Ai</span> <span style={{ color: '#DAEBE7' }}>software engineer</span></span>
                                </h1>
                            </Typist.Paste>
                            <Typist.Delay ms={500} />
                            <Typist.Backspace count={42} />
                                <h1 
                                    style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'normal', textAlign: 'center' }} 
                                    className="text-4xl font-bold z-10"
                                >
                                    <span style={{ color: '#567CCA' }}>Dynamically scaffold</span><br />
                                    <span><span style={{ color: '#217AFF' }}>entire</span> <span style={{ color: '#DAEBE7' }}>codebases</span></span>
                                </h1>
                            <Typist.Delay ms={5000} />
                            <Typist.Backspace count={37} />
                            <h1 
                                style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', textAlign: 'center' }} 
                                className="text-4xl font-bold z-10"
                            >
                                <span style={{ color: '#567CCA' }}>Turn your IDE into an</span><br />
                                <span><span style={{ color: '#217AFF' }}>Ai</span> <span style={{ color: '#DAEBE7' }}>software engineer</span></span>
                            </h1>
                            <Typist.Delay ms={4500} />
                        </Typist>
                    </motion.div>
                )}

                {scrollPhase === 2 && (
                    <motion.div
                        ref={sloganRef}
                        className="flex flex-col items-center justify-center h-auto md:px-80"
                        initial={{ y: lastY.current }}
                        animate={{ y: lastY.current }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <Typist
                            cursor={<span className="typing-cursor">|</span>}
                            typingDelay={45} // Adjust this for typing speed
                        >
                            <h1 
                                style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', textAlign: 'center' }} 
                                className="text-4xl font-bold z-10"
                            >
                                <span style={{ color: '#567CCA' }}>Stream code</span><br />
                                <span><span style={{ color: '#217AFF' }}>in</span> <span style={{ color: '#DAEBE7' }}> the background</span></span>
                            </h1>
                        </Typist>
                    </motion.div>
                )}

                {scrollPhase === 3 && (
                    <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-auto md:px-80"
                >
                    <div className="p-4">
                        <h1 
                            style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', textAlign: 'center' }} 
                            className="text-4xl font-bold z-10"
                        >
                            <span style={{ color: '#DAEBE7' }}>Available now on</span><br />
                            <span><span style={{ color: '#217AFF' }}>VS Code</span></span>
                        </h1>
                    </div>
                </motion.div>
                )}

                {/* {scrollPhase === 3 && (
                    <DownloadNowButton />
                )} */}

                {/* Video */}
                {(scrollPhase === 1) && (
                    <motion.div 
                    className="absolute top-1/2 left-0 w-full flex items-center justify-center mt-[-10%]"
                    initial={{ opacity: 0, scale: 0.5 }} // setting initial values
                    animate={videoControls}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    <AutoPlayVideo />
                </motion.div>
                )}
                {scrollPhase === 2 && (
                    <motion.div 
                    className="absolute top-1/2 left-0 w-full flex items-center justify-center mt-[-10%]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={videoControls}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    <AutoPlayVideo filename="/demos/background_streaming.mp4" poster="/demos/background_streaming_thumb.png" />
                </motion.div>
                )}
                <PaginationIndicator isMobileView={isMobileView} totalSlides={4} currentSlide={scrollPhase} onDotClick={handleDotClick} />

                {scrollPhase === 3 && (
                  <motion.div 
                  className="w-full flex justify-between items-center p-8 text-white absolute bottom-0 left-0"
                    initial="hidden" 
                    animate="visible" 
                    variants={footerVariants}
                  >
                    <Footer />
                  </motion.div>
                )}
            </main>
            </div>
        </>
    );
}
