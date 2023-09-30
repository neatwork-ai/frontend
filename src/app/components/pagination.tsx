import { motion, useAnimation } from 'framer-motion';

interface PaginationIndicatorProps {
    totalSlides: number;
    currentSlide: number;
    onDotClick: (index: number) => void;
}

const PaginationIndicator: React.FC<PaginationIndicatorProps> = ({ totalSlides, currentSlide, onDotClick }) => {
    return (
        <div className="absolute right-8 space-y-2 flex flex-col items-center"> {/* Adjusted to flex */}
            {Array.from({ length: totalSlides }).map((_, index) => (
                <div key={index} onClick={() => onDotClick(index)} className="cursor-pointer">
                    <LiquidDot isActive={currentSlide === index} />
                </div>
            ))}
        </div>
    );
};
export default PaginationIndicator

interface LiquidDotProps {
    isActive: boolean;
}

const LiquidDot: React.FC<LiquidDotProps> = ({ isActive }) => {
    const baseClasses = "rounded-full relative overflow-hidden bg-indicator-dot shadow-md filter blur-[0.5px] flex items-center justify-center"; // Added flex alignment classes
    const sizeClasses = isActive ? "w-3 h-3" : "w-1 h-1"; 

    return (
        <div className={`${baseClasses} ${sizeClasses}`}>
            <motion.div 
                initial={{ backgroundColor: '#D9D9D9' }} // starting color
                animate={{ backgroundColor: isActive ? "white" : "#D9D9D9" }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 left-0 w-full h-full" // removed conditional background class
            ></motion.div>
        </div>
    );
};
