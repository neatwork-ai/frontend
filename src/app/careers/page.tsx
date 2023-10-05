"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/navBar';
import React, { useRef } from 'react';
import Paragraph from '../components/paragraph';

const Careers = () => {
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
                        Careers
                    </h1>

                    <div 
                        className="scrollable-content overflow-auto px-4 sm:px-16 md:px-80 lg:px-80 xl:px-80 2xl:px-80"
                        style={{ maxHeight: `${contentMaxHeight}px` }}
                    >
                        <Paragraph> At Neatwork, we believe that the path to large-scale AI automation is rooted in three foundational blocks. </Paragraph>
                        <Paragraph> The first is Programmatic contextualization, which speaks to the AI Agent&apos;s ability to retrieve the most important information and present it effectively to the LLM. </Paragraph>
                        <Paragraph> Secondly, ensuring tasks are closed-looped; in other words, these systems should not only execute tasks but also verify whether a task was done correctly. Lastly, we are building interoperability between communication channels and output channels. </Paragraph>
                        <Paragraph> This isn&apos;t a mere technical requisite; it&apos;s vital to ensure that humans aren&apos;t reduced to the menial role of transcribing LLM output into tangible action. Instead, the system should seamlessly transition from decision to action, making AI automation a truly transformative force. </Paragraph>
                        <Paragraph> With Neatcoder, we are building these foundational blocks as they pertain to software development as a whole. As part of our scaling efforts, we are looking to grow our team. </Paragraph>
                        <Paragraph> If you are a developer and you see the future of work being Neatwork, feel free to reach out to us at hiring@neatwork.ai </Paragraph>
                    </div>
                </motion.div>
                </div>
            </main>
        </>
    );
}

export default Careers;