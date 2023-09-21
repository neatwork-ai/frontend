import Image from 'next/image';

const LandingSection = () => {
    return (
      <div className="flex items-center justify-between h-screen p-8 bg-transparent">
        <div className="flex flex-col">
          <h1 style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'pre-wrap' }} className="text-4xl font-bold">
            <span style={{ color: '#DFEAFF' }}>Turn your IDE into an {'\n'}</span>
            <span style={{ color: '#5B89FF' }}>AI </span>
            <span style={{ color: '#DAEBE7' }}>Software Engineer</span>
          </h1>
        </div>
        <div className="relative">
          <Image 
            src="/assets/white_shadow.svg" 
            alt="Company Logo" 
            width={568}
            height={563}
            className="filter drop-shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)]"
          />
        </div>
      </div>
    );
  };
  
  export default LandingSection;
  