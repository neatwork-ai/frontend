"use client";

import React, { useState } from 'react';
import Image from "next/image";
import FlyingDonut from './components/landing/donut'; 
import { CombinedComponent } from './components/landing/landing';

export default function Home() {
    const [email, setEmail] = useState('');

    const handleEmailSignup = () => {
        // Handle email signup logic here.
        // For now, just logging to the console.
        console.log(`Email ${email} signed up!`);
    };

    return (
        <>
        <NavigationBar /> {/* <-- Adding the navigation bar here */}
        <main className="bg-custom-blue flex flex-col items-center justify-center min-h-screen p-24">
        <Image src="/assets/banner.svg" alt="Logo" width={665} height={153} />
            {/* <h1 className="text-4xl mb-4 font-exo text-white">Neatwork.Ai</h1> */}
            <p className="text-2xl mb-8 text-white">Join the Software Development AI Revolution</p>
            
            <div className="w-full max-w-lg">
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
            </div>
            <CombinedComponent />
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <SampleComponent /> {/* <-- Add the sample component here */}
            <ProductComponent /> {/* <-- Add the sample component here */}
            <WaitlistComponent /> {/* <-- Add the sample component here */}
            <CompanyComponent /> {/* <-- Add the sample component here */}
        </main>
        </>
    );
}


function SampleComponent() {
    return (
        <div id="Sample" className="w-full max-w-lg mt-8 p-4">
            <h2 className="text-xl mb-4">Sample Section</h2>
            <p>This is a sample section that appears as you scroll down.</p>
        </div>
    );
}

function ProductComponent() {
    return (
        <div id="Product" className="w-full max-w-lg mt-8 p-4">
            <h2 className="text-xl mb-4">Product Section</h2>
            <p>This is a sample section that appears as you scroll down.</p>
        </div>
    );
}

function WaitlistComponent() {
    return (
        <div id="Waitlist" className="w-full max-w-lg mt-8 p-4">
            <h2 className="text-xl mb-4">Product Section</h2>
            <p>This is a sample section that appears as you scroll down.</p>
        </div>
    );
}

function CompanyComponent() {
    return (
        <div id="Company" className="w-full max-w-lg mt-8 p-4">
            <h2 className="text-xl mb-4">Product Section</h2>
            <p>This is a sample section that appears as you scroll down.</p>
        </div>
    );
}

function ContactComponent() {
    return (
        <div id="Company" className="w-full max-w-lg mt-8 p-4">
            <h2 className="text-xl mb-4">Product Section</h2>
            <p>This is a sample section that appears as you scroll down.</p>
        </div>
    );
}

function NavigationBar() {
    return (
        <nav className="bg-blue-800 p-4 text-white w-full">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold">Neatwork.Ai</a>
                    <div>
                        <a href="#Product" className="mr-4">Product</a>
                        <a href="#" className="mr-4">About</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
