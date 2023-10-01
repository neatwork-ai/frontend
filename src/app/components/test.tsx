import Typist from '@/typist/Typist';
import React, { useState } from 'react';

const TypingComponent = () => {

    return (
        <Typist
            typingDelay={50} // Adjust this for typing speed
            backspaceDelay={50} // Adjust this for backspace speed
        >
            <Typist.Paste>Turn your IDE into an AI Software Engineer</Typist.Paste>
            <Typist.Delay ms={3000} />
            <Typist.Backspace count={42} />
            Dynamically scaffold entire codebases
            <Typist.Delay ms={3000} />
            <Typist.Backspace count={37} />
            Turn your IDE into an AI Software Engineer
        </Typist>
    );
};

export default TypingComponent;
