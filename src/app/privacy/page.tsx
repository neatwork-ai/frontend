"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/navBar';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <main className="main-content flex flex-col justify-center items-center min-h-screen relative bg-gradient-dark-blue">
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <h1 
                        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', color: '#FFFFFF' }} 
                        className="text-4xl font-bold z-10 mb-4"
                    >
                        Privacy Policy
                    </h1>
                    <p 
                        style={{ fontFamily: 'Exo, sans-serif', color: '#FFFFFF' }} 
                        className="color md:px-80"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </motion.div>
            </main>
        </>
    );
}

export default PrivacyPolicy;