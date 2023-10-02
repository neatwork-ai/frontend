import { globals } from './globals';

// This should run if the screen is resized, not when scrolling occurs
export const setMaxShift = (
    navBarRef: React.MutableRefObject<HTMLElement | null>,
    sloganRef: React.MutableRefObject<HTMLParagraphElement | null>,
    override: Boolean
) => {
    if (sloganRef.current && navBarRef.current) {
        if (!globals.maxAbsoluteShift || override) {
            const sloganBounds = sloganRef.current.getBoundingClientRect();
            const navBarBounds = navBarRef.current.getBoundingClientRect();

            // Example: -(163 - 104) => -59
            // represents the height between the slogan and the navbar in negative terms
            if (globals.currentSloganPosition != undefined) {
                globals.maxAbsoluteShift =  - (sloganBounds.top - globals.currentSloganPosition - navBarBounds.bottom);
            } else {
                globals.maxAbsoluteShift =  - (sloganBounds.top - navBarBounds.bottom);
            }
        }
        return globals.maxAbsoluteShift;
    }
}