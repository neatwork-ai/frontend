"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import GlassButton from './components/download';
import Navbar from './components/navBar';
import LandingSection from './components/landing';
import { motion, useAnimation } from 'framer-motion';
import AutoPlayVideo from './components/video';

export default function Home() {

    return (
        <>
        <Navbar />
        <main className="bg-dark-blue flex flex-col justify-center min-h-screen">
            <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-dark-blue px-80"> {/* <-- Changed justify-between to justify-center */}
                <div className="flex flex-col w-full md:w-auto text-center md:text-left mb-10 md:mb-0 justify-center items-center" id="slogan"> {/* <-- Added items-center and removed fixed md:static */}
                    <div className="flex flex-col w-full md:w-auto text-center md:text-left mb-10 md:mb-0 justify-center items-center"> {/* <-- Added items-center */}
                        <h1 style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'pre-wrap' }} className="text-4xl font-bold">
                            <span style={{ color: '#DFEAFF' }}>Turn your IDE into an {'\n'}</span>
                            <span style={{ color: '#5B89FF' }}>AI </span>
                            <span style={{ color: '#DAEBE7' }}>Software Engineer</span>
                        </h1>
                    </div>
                    <AutoPlayVideo />
                </div>
            
            </div>
        </main>
        </>
    );
}
