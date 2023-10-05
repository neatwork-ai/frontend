"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/navBar';
import React, { useRef } from 'react';
import Paragraph from '../components/paragraph';

const AboutUs = () => {
    const [isMobileView, setIsMobileView] = React.useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
    const navBarRef = useRef<HTMLElement | null>(null);
    const [contentMaxHeight, setContentMaxHeight] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
        const updateHeight = () => {
            if (navBarRef.current) {
                const navBarHeight = navBarRef.current.offsetHeight;
                const viewportHeight = window.innerHeight;
                
                // Set the content max height to be viewport minus the navbar height.
                // Adjust as needed for additional spacing or other elements.
                setContentMaxHeight((viewportHeight - navBarHeight) * 0.8);
            }
        }
    
        // Initial calculation
        updateHeight();
    
        // Add a resize listener
        window.addEventListener('resize', updateHeight);
    
        // Cleanup the listener on component unmount
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <>
            <Navbar isMobileView={isMobileView} setIsMobileView={setIsMobileView} ref={navBarRef} />
            <main
                className="pt-32 sub-content flex flex-col min-h-screen relative bg-gradient-dark-blue"
            >
                <div className="flex-1 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <h1 
                        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', color: '#FFFFFF', marginTop: '50px' }} 
                        className="text-4xl font-bold z-10 mb-4"
                    >
                        About us
                    </h1>

                    <div 
                        className="scrollable-content overflow-auto px-4 sm:px-16 md:px-80 lg:px-80 xl:px-80 2xl:px-80"
                        style={{ maxHeight: `${contentMaxHeight}px` }}
                    >
                        <Paragraph> Our mission is to be a core pillar in the transition from human capital to AI-augmented human capital as we aim to emerge as a frontrunner ushering in what will become the new economy. We are beginning our journey by releasing Neatcoder, a VS Code extension that enables software developers to transform their Integrated Development Environment into an AI Software Engineer. </Paragraph>
                        <Paragraph> Before, developers would spend time writing a small number of keywords in search engines and the majority of time searching themselves for answers that fit their specific problems. With the rise of ChatGPT 3.5, and more recently GPT-4, there was a massive shift in the developer code writing journey. </Paragraph>
                        <Paragraph> While LLMs now provide extremely customized answers tailored to the developer’s problem, developers find themselves writing 10 to 100 times more keywords than before, in order to provide LLMs with the proper context required to receive an accurate answer. Not only that, but developers now act as the middlemen, performing all the integration and possessing full context of the project they are working on, as well as the context of the entire company’s technological stack in which the project is being integrated. As result this is creating a great deal of developer fatigue. </Paragraph>
                        <Paragraph> Neatcoder aims to eliminate this effort by providing a middleware that not only allows developers to link external interfaces but also lets them be abstracted away from the context-building phase. It also establishes interoperability between the channels of communication and the code editing process. The result is an AI Software Engineer that understands your codebase in real-time. </Paragraph>
                    </div>
                </motion.div>
                </div>
            </main>
        </>
    );
}

export default AboutUs;