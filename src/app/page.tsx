"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/navBar';
import { motion, useAnimation } from 'framer-motion';

export default function Home() {
    const [targetY, setTargetY] = useState(0);
    const controls = useAnimation();
    const lastY = useRef(0);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Define the maximum allowable offset
            const MAX_Y = -250; // Adjust this value to your preference
            let newTarget = lastY.current - e.deltaY *1.2; // Multiplier to control sensitivity

            // Ensure we don't scroll past the max value
            newTarget = Math.max(MAX_Y, newTarget);
            newTarget = Math.min(0, newTarget); // Ensuring we don't scroll in the reverse direction

            setTargetY(newTarget);
            lastY.current = newTarget;
        };

        const updatePosition = () => {
            // Lerp formula: newValue = (target - current) * factor + current
            const newY = (targetY - lastY.current) * 0.5 + lastY.current;
            controls.start({ y: newY });
            lastY.current = newY;

            requestAnimationFrame(updatePosition);
        };

        window.addEventListener("wheel", handleWheel);
        requestAnimationFrame(updatePosition);

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [targetY, controls]);

    return (
        <>
            <Navbar />
            <main className="bg-dark-blue flex flex-col justify-center min-h-screen">
                <motion.div
                    className="flex flex-col items-center justify-center h-screen bg-dark-blue px-80"
                    animate={controls}
                >
                    <h1 style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'pre-wrap' }} className="text-4xl font-bold">
                        <span style={{ color: '#DFEAFF' }}>Turn your IDE into an {'\n'}</span>
                        <span style={{ color: '#5B89FF' }}>AI </span>
                        <span style={{ color: '#DAEBE7' }}>Software Engineer</span>
                    </h1>
                </motion.div>
            </main>
        </>
    );
}
