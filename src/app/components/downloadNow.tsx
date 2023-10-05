import { trackEvent } from '@/mixpanel/mixpanel';
import React, { ReactNode } from 'react';

const DownloadNowButton = () => {
  const handleButtonClick = () => {
    // Track the event with Mixpanel
    trackEvent('Button clicked: download', { location: 'DownloadNowButton' });
  };
  
  return (
    <div className= "p-4">
        <a href="https://marketplace.visualstudio.com/items?itemName=NeatworkAi.neatcoder" target="_blank" rel="noopener noreferrer">
          <button
            onClick={handleButtonClick}
            style={{ fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', textAlign: 'center' }} 
            className="bg-alpha-blue rounded-lg shadow-strong py-2 px-4 text-white text-uppercase transition-transform duration-200 hover:scale-105">
            Download Now
          </button>
        </a>
    </div>
  );
};

export default DownloadNowButton;
