import React, { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return (
    <p 
        style={{ fontFamily: 'Exo, sans-serif', color: '#FFFFFF', marginBottom: '20px' }} 
        className="color text-center"
    >
        {children}
    </p>
  );
};

export default Paragraph;
