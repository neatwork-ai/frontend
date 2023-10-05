import { trackEvent } from '@/mixpanel/mixpanel';
import React, { ReactNode } from 'react';

const GlassButton = () => {
  const handleButtonClick = () => {
    // Track the event with Mixpanel
    trackEvent('Button clicked: download', { location: 'navbar' });
  };
  
  return (
    <a href="https://marketplace.visualstudio.com/items?itemName=NeatworkAi.neatcoder" target="_blank" rel="noopener noreferrer">
      <button
        onClick={handleButtonClick}
        className="bg-glass-gradient rounded-xl shadow-glass backdrop-blur py-2 px-4 text-green-dim text-uppercase transition-transform duration-200 hover:scale-105"
      >
        download
      </button>
    </a>
  );
};

export default GlassButton;
