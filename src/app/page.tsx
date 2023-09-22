"use client";

import React, { useState } from 'react';
import Image from "next/image";
import GlassButton from './components/landing/download';
import Navbar from './components/landing/navBar';
import LandingSection from './components/landing/landing';

export default function Home() {
    // const [email, setEmail] = useState('');

    // const handleEmailSignup = () => {
    //     // Handle email signup logic here.
    //     // For now, just logging to the console.
    //     console.log(`Email ${email} signed up!`);
    // };

    return (
        <>
        <Navbar />
        <main className="bg-dark-blue flex flex-col justify-center min-h-screen">
            
            {/* <div className="w-full max-w-lg">
                <input 
                    className="border p-2 w-full mb-4"
                    type="email" 
                    placeholder="Enter your email for the waiting list"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button 
                    className="bg-blue-500 text-white p-2 w-full"
                    onClick={handleEmailSignup}
                >
                    Join Waiting List
                </button>
            </div> */}
            <LandingSection />
        </main>
        </>
    );
}
