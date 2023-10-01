import React, { useState } from 'react';
import Typist from 'react-typist-component';

const TypingComponent = () => {

    return (
        <Typist>
            ChatGPT has no clue what the hell is going on
            <Typist.Backspace count={5} delay={2000} />
        </Typist>
    );
};

export default TypingComponent;