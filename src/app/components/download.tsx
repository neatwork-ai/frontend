import React, { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
}

const GlassButton = () => {
  return (
    <button className="bg-glass-gradient rounded-xl shadow-glass backdrop-blur py-2 px-4 text-green-dim text-uppercase transition-transform duration-200 hover:scale-105">
      download
    </button>
  );
};

export default GlassButton;
