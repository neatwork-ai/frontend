import { motion, useAnimation } from 'framer-motion';

interface PaginationIndicatorProps {
    isMobileView: boolean;
    totalSlides: number;
    currentSlide: number;
    onDotClick: (index: number) => void;
}

const PaginationIndicator: React.FC<PaginationIndicatorProps> = ({ 
    isMobileView,
    totalSlides,
    currentSlide,
    onDotClick,
}) => {
    const positionClass = isMobileView ? 'bottom-16' : 'right-8';
    const flexDirection = isMobileView ? 'flex-row' : 'flex-col';
    const spacing = isMobileView ? 'space-x-2' : 'space-y-2';

    return (
        <div className={`absolute ${positionClass} ${spacing} flex ${flexDirection} items-center`}>
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
    const sizeClasses = isActive ? "w-5 h-5" : "w-2 h-2";

    return (
        <div className={`${baseClasses} ${sizeClasses}`}>
            <motion.div 
                initial={{ backgroundColor: '#D9D9D9' }} // starting color
                animate={{ backgroundColor: isActive ? "#FFFFFF" : "#D9D9D9" }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 left-0 w-full h-full" // removed conditional background class
            ></motion.div>
        </div>
    );
};
