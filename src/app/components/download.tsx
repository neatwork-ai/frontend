import React, { ReactNode } from 'react';

const GlassButton = () => {
  return (
    <a href="https://marketplace.visualstudio.com/vscode" target="_blank" rel="noopener noreferrer">
      <button className="bg-glass-gradient rounded-xl shadow-glass backdrop-blur py-2 px-4 text-green-dim text-uppercase transition-transform duration-200 hover:scale-105">
        download
      </button>
    </a>
  );
};

export default GlassButton;
